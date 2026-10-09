"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import AccessibilityPanel from "@/components/AccessibilityPanel";

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

const AppShellContext = createContext(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) throw new Error("useAppShell deve ser usado dentro de AppShell.");
  return context;
}

export default function AppShell({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [accessibility, setAccessibility] = useState(defaultAccessibility);

  const accessibilityClassName = [
    "accessibility-shell",
    darkMode ? "dark" : "",
    accessibility.textScale > 0 ? `a11y-text-scale-${accessibility.textScale}` : "",
    accessibility.highContrast ? "a11y-high-contrast" : "",
    accessibility.readingFocus ? "a11y-reading-focus" : "",
    accessibility.readingRuler ? "a11y-reading-ruler" : "",
    accessibility.readingRuler ? `a11y-ruler-${accessibility.rulerPosition}` : "",
    accessibility.reduceMotion ? "a11y-reduce-motion" : "",
    accessibility.screenReader ? "a11y-screen-reader" : "",
    accessibility.captions ? "a11y-captions" : "",
    accessibility.textOnly ? "a11y-text-only" : "",
  ].filter(Boolean).join(" ");

  const contextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
    toggleDarkMode: () => setDarkMode((current) => !current),
    accessibility,
  }), [darkMode, accessibility]);

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
          {children}
          <AccessibilityPanel
            preferences={accessibility}
            setPreferences={setAccessibility}
          />
        </div>
      </MotionConfig>
    </AppShellContext.Provider>
  );
}
