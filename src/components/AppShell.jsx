"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import AppSidebar from "@/components/AppSidebar";

const A11Y_STORAGE_KEY = "manual-nao-a11y";

const defaultAccessibility = {
  textScale: 0,
  highContrast: false,
  readingFocus: false,
  readingRuler: false,
  rulerPosition: "middle",
  reduceMotion: false,
  screenReader: false,
  captions: false,
  textOnly: false,
};

const SIDEBAR_HIDDEN_ROUTES = new Set(["/", "/projeto", "/login", "/cadastro"]);
const TEXT_SCALE_PERCENTS = [100, 108, 116, 125];
const RULER_POSITIONS = { top: 28, middle: 46, bottom: 68 };

const AppShellContext = createContext(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) throw new Error("useAppShell deve ser usado dentro de AppShell.");
  return context;
}

export default function AppShell({ children, viewerName, isAdmin }) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [vlibrasOpen, setVlibrasOpen] = useState(false);
  const [accessibility, setAccessibilityState] = useState(defaultAccessibility);
  const [rulerY, setRulerY] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const showSidebar = !SIDEBAR_HIDDEN_ROUTES.has(pathname);

  // Carrega preferencias salvas no dispositivo apos hidratacao
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(A11Y_STORAGE_KEY);
        if (saved) {
          setAccessibilityState((prev) => ({ ...prev, ...JSON.parse(saved) }));
        }
      } catch {
        // Ignora erro de leitura do localStorage
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const setAccessibility = useCallback((updater) => {
    setAccessibilityState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignora erro de escrita no localStorage
      }
      return next;
    });
  }, []);

  // Escala real de fonte na raiz (rem) + classes globais no html
  useEffect(() => {
    const root = document.documentElement;
    const percent = TEXT_SCALE_PERCENTS[accessibility.textScale] || 100;
    root.style.fontSize = `${percent}%`;
    root.classList.toggle("a11y-reduce-motion", accessibility.reduceMotion);
    root.classList.toggle("a11y-text-only", accessibility.textOnly);

    return () => {
      root.style.fontSize = "";
      root.classList.remove("a11y-reduce-motion", "a11y-text-only");
    };
  }, [accessibility.textScale, accessibility.reduceMotion, accessibility.textOnly]);

  // Regua de leitura interativa (segue o ponteiro quando modo 'cursor' esta ativo)
  useEffect(() => {
    if (!accessibility.readingRuler || accessibility.rulerPosition !== "cursor") {
      return;
    }

    const handlePointerMove = (event) => {
      setRulerY(Math.max(36, Math.min(window.innerHeight - 36, event.clientY)));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [accessibility.readingRuler, accessibility.rulerPosition]);

  // Leitor de tela real com Web Speech API (pt-BR)
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speakText = useCallback((text) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const clean = (text || "").replace(/\s+/g, " ").trim();
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Le automaticamente elementos focados via teclado ou clicados dentro de <main> quando o leitor esta ativo
  useEffect(() => {
    if (!accessibility.screenReader) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const extractReadableText = (target) => {
      if (!(target instanceof Element)) return "";
      if (target.closest(".accessibility-panel, .vlibras-card")) return "";
      const label =
        target.getAttribute("aria-label") ||
        target.textContent ||
        "";
      return label.trim().slice(0, 350);
    };

    const handleFocusIn = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.matches("button, a, input, select, textarea, [tabindex]")) {
        const text = extractReadableText(target);
        if (text) speakText(text);
      }
    };

    const handleMainClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const block = target.closest("main h1, main h2, main h3, main p, main li");
      if (block) {
        const text = extractReadableText(block);
        if (text) speakText(text);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("click", handleMainClick);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("click", handleMainClick);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [accessibility.screenReader, speakText]);

  // Legendas automaticas abaixo de imagens/iframes dentro de <main> quando 'captions' esta ativo
  useEffect(() => {
    if (!accessibility.captions) {
      document.querySelectorAll(".a11y-auto-caption").forEach((el) => el.remove());
      return;
    }

    const mediaItems = document.querySelectorAll("main img[alt], main iframe[title]");
    mediaItems.forEach((el) => {
      const text = el.getAttribute("alt") || el.getAttribute("title") || "";
      if (!text.trim()) return;
      if (el.parentElement?.querySelector(".a11y-auto-caption")) return;

      const caption = document.createElement("span");
      caption.className = "a11y-auto-caption";
      caption.textContent = `Descrição: ${text.trim()}`;
      el.insertAdjacentElement("afterend", caption);
    });

    return () => {
      document.querySelectorAll(".a11y-auto-caption").forEach((el) => el.remove());
    };
  }, [accessibility.captions, pathname]);

  const accessibilityClassName = [
    "accessibility-shell",
    showSidebar ? "has-sidebar" : "",
    showSidebar && isSidebarOpen ? "sidebar-expanded" : "",
    darkMode ? "dark" : "",
    accessibility.textScale > 0 ? `a11y-text-scale-${accessibility.textScale}` : "",
    accessibility.highContrast ? "a11y-high-contrast" : "",
    accessibility.readingFocus ? "a11y-reading-focus" : "",
    accessibility.reduceMotion ? "a11y-reduce-motion" : "",
    accessibility.screenReader ? "a11y-screen-reader" : "",
    accessibility.captions ? "a11y-captions" : "",
    accessibility.textOnly ? "a11y-text-only" : "",
  ].filter(Boolean).join(" ");

  const toggleAccessibilityPanel = useCallback(() => {
    setAccessibilityOpen((prev) => {
      const next = !prev;
      if (next) setVlibrasOpen(false);
      return next;
    });
  }, []);

  const toggleVlibras = useCallback(() => {
    setVlibrasOpen((prev) => {
      const next = !prev;
      if (next) setAccessibilityOpen(false);
      return next;
    });
  }, []);

  const activeSpeaking = accessibility.screenReader && isSpeaking;

  const contextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
    toggleDarkMode: () => setDarkMode((current) => !current),
    accessibility,
    accessibilityOpen,
    setAccessibilityOpen,
    toggleAccessibilityPanel,
    vlibrasOpen,
    setVlibrasOpen,
    toggleVlibras,
    speakText,
    stopSpeaking,
    isSpeaking: activeSpeaking,
  }), [
    darkMode,
    accessibility,
    accessibilityOpen,
    vlibrasOpen,
    toggleAccessibilityPanel,
    toggleVlibras,
    speakText,
    stopSpeaking,
    activeSpeaking,
  ]);

  const rulerTopStyle =
    accessibility.rulerPosition === "cursor" && rulerY !== null
      ? { top: `${rulerY}px`, transform: "translateY(-50%)" }
      : { top: `${RULER_POSITIONS[accessibility.rulerPosition] || 46}%` };

  return (
    <AppShellContext.Provider value={contextValue}>
      <MotionConfig
        reducedMotion={accessibility.reduceMotion ? "always" : "user"}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={accessibilityClassName}>
          <a className="skip-link" href="#conteudo-principal">
            Pular para o conteúdo principal
          </a>

          {accessibility.readingRuler && (
            <div
              className="a11y-reading-ruler-bar"
              style={rulerTopStyle}
              aria-hidden="true"
            />
          )}

          {showSidebar ? (
            <div className="flex flex-col md:flex-row min-h-screen relative">
              <AppSidebar
                viewerName={viewerName}
                isAdmin={isAdmin}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((current) => !current)}
              />
              <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                  isSidebarOpen ? "md:ml-64 lg:ml-72" : "md:ml-20"
                }`}
              >
                {children}
              </div>
            </div>
          ) : (
            children
          )}

          <AccessibilityPanel
            preferences={accessibility}
            setPreferences={setAccessibility}
            open={accessibilityOpen}
            setOpen={setAccessibilityOpen}
            vlibrasOpen={vlibrasOpen}
            setVlibrasOpen={setVlibrasOpen}
            speakText={speakText}
            stopSpeaking={stopSpeaking}
            isSpeaking={activeSpeaking}
          />
        </div>
      </MotionConfig>
    </AppShellContext.Provider>
  );
}
