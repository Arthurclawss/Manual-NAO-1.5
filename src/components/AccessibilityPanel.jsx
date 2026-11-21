"use client";

import {
  Accessibility,
  Captions,
  Eye,
  Focus,
  MessageCircle,
  Minus,
  Play,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useState } from "react";

const options = [
  {
    key: "highContrast",
    icon: <Eye size={18} />,
    title: "Alto contraste",
    description: "Reforca contraste, bordas, foco de teclado e sublinhado em links.",
  },
  {
    key: "readingFocus",
    icon: <Focus size={18} />,
    title: "Foco de leitura",
    description: "Suaviza o restante da pagina e destaca a secao sob o cursor ou foco.",
  },
  {
    key: "readingRuler",
    icon: <Minus size={18} />,
    title: "Regua de leitura",
    description: "Exibe uma faixa guia fixa ou que acompanha o cursor do mouse.",
  },
  {
    key: "reduceMotion",
    icon: <Accessibility size={18} />,
    title: "Reduzir movimento",
    description: "Desativa animacoes, transicoes e particulas ao clicar.",
  },
  {
    key: "screenReader",
    icon: <Volume2 size={18} />,
    title: "Leitor em voz alta",
    description: "Le em voz alta (pt-BR) blocos clicados, focados ou a pagina inteira.",
  },
  {
    key: "captions",
    icon: <Captions size={18} />,
    title: "Legendas e descricoes",
    description: "Exibe descricoes textuais visiveis abaixo de imagens e videos.",
  },
  {
    key: "textOnly",
    icon: <MessageCircle size={18} />,
    title: "Leitura limpa (texto)",
    description: "Oculta fundos decorativos e melhora o espacamento para leitura.",
  },
];

function AccessibilityPanel({
  preferences,
  setPreferences,
  open: controlledOpen,
  setOpen: setControlledOpen,
  vlibrasOpen: controlledVlibrasOpen,
  setVlibrasOpen: setControlledVlibrasOpen,
  speakText,
  stopSpeaking,
  isSpeaking,
  showSidebar = true,
  pathname = "/",
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalVlibrasOpen, setInternalVlibrasOpen] = useState(false);
  const [vlibrasStatus, setVlibrasStatus] = useState("idle");

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;
  const vlibrasOpen =
    controlledVlibrasOpen !== undefined ? controlledVlibrasOpen : internalVlibrasOpen;
  const setVlibrasOpen = setControlledVlibrasOpen || setInternalVlibrasOpen;

  function togglePreference(key) {
    setPreferences((current) => {
      const nextValue = !current[key];
      if (key === "screenReader" && nextValue && speakText) {
        speakText("Leitor em voz alta ativado. Clique em qualquer texto ou use Tab para ouvir.");
      }
      if (key === "screenReader" && !nextValue && stopSpeaking) {
        stopSpeaking();
      }
      return {
        ...current,
        [key]: nextValue,
      };
    });
  }

  function resetPreferences() {
    if (stopSpeaking) stopSpeaking();
    setPreferences({
      textScale: 0,
      highContrast: false,
      readingFocus: false,
      readingRuler: false,
      rulerPosition: "middle",
      reduceMotion: false,
      screenReader: false,
      captions: false,
      textOnly: false,
    });
  }

  function changeTextScale(nextScale) {
    setPreferences((current) => ({
      ...current,
      textScale: Math.min(3, Math.max(0, nextScale)),
    }));
  }

  function changeRulerPosition(position) {
    setPreferences((current) => ({
      ...current,
      readingRuler: true,
      rulerPosition: position,
    }));
  }

  function readCurrentPage() {
    if (!speakText) return;
    const main = document.querySelector("#conteudo-principal");
    const content = main ? main.innerText : document.body.innerText;
    speakText(content.slice(0, 1800));
  }

  function loadOfficialVlibras() {
    if (typeof window === "undefined") return;
    if (window.VLibras?.Widget) {
      setVlibrasStatus("ready");
      return;
    }
    setVlibrasStatus("loading");
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      try {
        if (window.VLibras?.Widget) {
          new window.VLibras.Widget("https://vlibras.gov.br/app");
          setVlibrasStatus("ready");
        } else {
          setVlibrasStatus("error");
        }
      } catch {
        setVlibrasStatus("error");
      }
    };
    script.onerror = () => setVlibrasStatus("error");
    document.body.appendChild(script);
  }

  const hasTopBarOnDesktop = !showSidebar && (pathname === "/" || pathname === "/projeto");
  const fontPositionClass = showSidebar
    ? "hidden md:inline-flex top-4 right-5"
    : hasTopBarOnDesktop
      ? "inline-flex top-20 right-4 sm:right-6"
      : "inline-flex top-4 right-4 sm:right-5";

  return (
    <>
      {/* Controle A+ / A- no canto superior direito */}
      <div
        className={`fixed ${fontPositionClass} z-[900] items-center gap-1 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/80 shadow-md px-2 py-1`}
        role="group"
        aria-label="Tamanho da fonte"
      >
        <button
          type="button"
          onClick={() => changeTextScale(preferences.textScale + 1)}
          disabled={preferences.textScale >= 3}
          aria-label="Aumentar tamanho da fonte"
          title="Aumentar fonte (A+)"
          className="px-2.5 py-1 rounded-full text-sm font-black text-slate-800 dark:text-white hover:bg-sky-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          A+
        </button>
        <span className="h-4 w-px bg-slate-300 dark:bg-neutral-700" aria-hidden="true" />
        <button
          type="button"
          onClick={() => changeTextScale(preferences.textScale - 1)}
          disabled={preferences.textScale <= 0}
          aria-label="Diminuir tamanho da fonte"
          title="Diminuir fonte (A-)"
          className="px-2.5 py-1 rounded-full text-sm font-black text-slate-800 dark:text-white hover:bg-sky-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          A-
        </button>
      </div>

      {/* Botões redondos flutuantes no canto inferior direito */}
      <div className="fixed right-4 bottom-4 sm:right-5 sm:bottom-5 z-[900] flex flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) setVlibrasOpen(false);
          }}
          aria-label="Abrir painel de acessibilidade"
          aria-expanded={open}
          title="Acessibilidade"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border ${
            open
              ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400 shadow-emerald-500/35 scale-105"
              : "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-700/60 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:scale-105"
          }`}
        >
          {/* Símbolo Universal de Acessibilidade Digital */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9.5" />
            <circle cx="12" cy="7.2" r="1.4" fill="currentColor" stroke="none" />
            <path d="M7.5 10.2h9" />
            <path d="M12 10.2v4.2" />
            <path d="M9.6 18.2l2.4-3.8 2.4 3.8" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            const next = !vlibrasOpen;
            setVlibrasOpen(next);
            if (next) setOpen(false);
          }}
          aria-label="Abrir avatar VLibras"
          aria-expanded={vlibrasOpen}
          title="VLibras (Libras)"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border ${
            vlibrasOpen
              ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white border-sky-400 shadow-sky-500/35 scale-105"
              : "bg-gradient-to-br from-sky-500 to-blue-600 text-white border-sky-400/70 hover:brightness-110 hover:scale-105"
          }`}
        >
          {/* Ícone de mãos em Libras */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8.5 13.5V6.8a1.2 1.2 0 0 1 2.4 0v4.2" />
            <path d="M10.9 10.5V5.5a1.2 1.2 0 0 1 2.4 0v5.5" />
            <path d="M13.3 10.8V6.8a1.2 1.2 0 0 1 2.4 0v5.2" />
            <path d="M15.7 12V8.8a1.1 1.1 0 0 1 2.2 0v5.4a5.4 5.4 0 0 1-5.4 5.4h-1.2a5.2 5.2 0 0 1-4.4-2.4l-1.9-3a1.2 1.2 0 0 1 1.9-1.5l1.6 1.5" />
          </svg>
        </button>
      </div>

      {open && (
        <aside className="accessibility-panel" aria-labelledby="accessibility-title">
          <div className="accessibility-panel-header">
            <div>
              <span>Preferencias</span>
              <h2 id="accessibility-title">Acessibilidade</h2>
            </div>

            <button
              type="button"
              aria-label="Fechar painel de acessibilidade"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="accessibility-options">
            {options.map((option) => (
              <button
                className={preferences[option.key] ? "a11y-option active" : "a11y-option"}
                type="button"
                key={option.key}
                aria-pressed={preferences[option.key]}
                onClick={() => togglePreference(option.key)}
              >
                <span className="a11y-option-icon">{option.icon}</span>

                <span>
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            ))}
          </div>

          {preferences.screenReader && (
            <div className="a11y-control-card mt-2.5">
              <div className="a11y-control-heading">
                <span className="a11y-option-icon">
                  <Volume2 size={18} />
                </span>
                <span>
                  <strong>Controles de leitura</strong>
                  <small>Leia o conteudo principal da pagina atual.</small>
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={readCurrentPage}
                  className="flex-1 min-h-[40px] rounded-lg bg-emerald-600 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5"
                >
                  <Play size={14} />
                  Ler pagina
                </button>
                <button
                  type="button"
                  onClick={stopSpeaking}
                  disabled={!isSpeaking}
                  className="min-h-[40px] px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-bold text-xs inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Square size={14} />
                  Parar
                </button>
              </div>
            </div>
          )}

          <div className="a11y-control-card mt-2.5">
            <div className="a11y-control-heading">
              <span className="a11y-option-icon">
                <Minus size={18} />
              </span>

              <span>
                <strong>Posicao da regua</strong>
                <small>Escolha uma altura fixa ou siga o mouse.</small>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 a11y-segmented" aria-label="Posicao da regua de leitura">
              {[
                { label: "alto", value: "top" },
                { label: "meio", value: "middle" },
                { label: "baixo", value: "bottom" },
                { label: "cursor", value: "cursor" },
              ].map((item) => (
                <button
                  className={preferences.rulerPosition === item.value ? "active" : ""}
                  type="button"
                  key={item.value}
                  aria-pressed={preferences.rulerPosition === item.value}
                  onClick={() => changeRulerPosition(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button className="a11y-reset" type="button" onClick={resetPreferences}>
            Restaurar padrao
          </button>
        </aside>
      )}

      <div className="sr-live-region" aria-live="polite">
        {preferences.screenReader && "Modo de leitura em voz alta ativado."}
        {preferences.captions && "Legendas e descricoes de midia ativadas."}
        {preferences.textOnly && "Modo de leitura limpa ativado."}
      </div>

      {vlibrasOpen && (
        <aside className="vlibras-card" aria-label="Suporte em Libras">
          <div className="flex items-center justify-between gap-2 mb-2">
            <strong className="!mb-0">VLibras</strong>
            <button
              type="button"
              aria-label="Fechar painel VLibras"
              onClick={() => setVlibrasOpen(false)}
              className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm">
            Ative o tradutor oficial de Libras para traduzir textos selecionados na pagina.
          </p>
          <button
            type="button"
            onClick={loadOfficialVlibras}
            disabled={vlibrasStatus === "loading" || vlibrasStatus === "ready"}
            className="mt-3 w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-bold text-sm transition-colors"
          >
            {vlibrasStatus === "ready"
              ? "VLibras carregado"
              : vlibrasStatus === "loading"
                ? "Carregando VLibras..."
                : "Ativar widget VLibras"}
          </button>
          {vlibrasStatus === "error" && (
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
              Nao foi possivel conectar ao servico vlibras.gov.br neste ambiente.
            </p>
          )}
        </aside>
      )}
    </>
  );
}

export default AccessibilityPanel;
