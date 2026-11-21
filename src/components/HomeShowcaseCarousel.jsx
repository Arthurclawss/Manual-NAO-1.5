"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const SLIDES = [
  {
    id: "trilha",
    badge: "01 · Trilha Guiada",
    title: "Aprenda passo a passo com 8 módulos",
    description:
      "Cada módulo traz objetivos claros, atividades práticas e um quiz interativo com 10 perguntas para desbloquear a próxima etapa.",
    accent: "from-sky-500 to-blue-600",
    visual: (
      <div className="space-y-3">
        {[
          { num: "01", name: "Conheça o NAO", xp: "120 XP", done: true },
          { num: "02", name: "Prepare o NAO para uma sessão", xp: "160 XP", active: true },
          { num: "03", name: "Explore o corpo do NAO", xp: "180 XP", locked: true },
        ].map((item) => (
          <div
            key={item.num}
            className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border ${
              item.done
                ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-700/50"
                : item.active
                  ? "bg-white dark:bg-neutral-800 border-sky-300 dark:border-sky-600/50 shadow-sm"
                  : "bg-slate-100/90 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 opacity-75"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  item.done
                    ? "bg-emerald-500 text-white"
                    : item.active
                      ? "bg-sky-500 text-white"
                      : "bg-slate-200 dark:bg-neutral-800 text-slate-500"
                }`}
              >
                {item.num}
              </span>
              <span className="font-bold text-sm text-neutral-900 dark:text-white truncate">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
              {item.xp}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "robo",
    badge: "02 · Construção 3D",
    title: "Monte o seu próprio robô NAO",
    description:
      "Conforme você conclui módulos e acumula XP, novas partes estruturais do robô são reveladas no seu perfil até completar 100%.",
    accent: "from-sky-500 via-sky-600 to-blue-800",
    visual: (
      <div className="flex items-center gap-5 p-4 rounded-2xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 text-white shadow-inner">
        <div className="relative w-24 h-36 shrink-0">
          <Image
            src="/nao-3d-construcao.png"
            alt="Modelo 3D do robô NAO"
            fill
            sizes="96px"
            className="object-contain grayscale opacity-35"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: "inset(42% 0 0 0)" }}
            aria-hidden="true"
          >
            <Image
              src="/nao-3d-construcao.png"
              alt=""
              fill
              sizes="96px"
              className="object-contain drop-shadow-xl"
            />
          </div>
          <div
            className="absolute inset-x-1 h-px bg-orange-300 shadow-[0_0_12px_3px_rgba(251,146,60,0.65)]"
            style={{ bottom: "58%" }}
          />
        </div>
        <div className="space-y-2.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-100">
            <Bot size={15} className="text-orange-300" />
            Evolução em tempo real
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold">
            {["Base", "Pernas", "Quadril", "Torso"].map((part, idx) => (
              <span
                key={part}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg ${
                  idx < 3 ? "bg-white text-sky-700" : "bg-white/15 text-sky-100"
                }`}
              >
                <CheckCircle2 size={12} className={idx < 3 ? "text-orange-500" : "opacity-50"} />
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "comunidade",
    badge: "03 · Conquistas & Fórum",
    title: "Medalhas, patentes e comunidade",
    description:
      "Desbloqueie conquistas por raridade, acompanhe capítulos por tema e tire dúvidas ou compartilhe arquivos no Fórum da turma.",
    accent: "from-amber-400 to-orange-500",
    visual: (
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/50 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-sm">
            <Trophy size={18} />
          </div>
          <strong className="block text-sm font-extrabold text-neutral-900 dark:text-white">
            12 Conquistas
          </strong>
          <span className="block text-xs text-neutral-600 dark:text-neutral-300">
            Comum, Rara, Épica e Lendária com bônus de XP.
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-sky-50/90 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-700/50 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-sm">
            <MessageCircle size={18} />
          </div>
          <strong className="block text-sm font-extrabold text-neutral-900 dark:text-white">
            Fórum Ativo
          </strong>
          <span className="block text-xs text-neutral-600 dark:text-neutral-300">
            Publique tópicos, curta respostas e anexe materiais.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "acessibilidade",
    badge: "04 · Inclusão",
    title: "Acessibilidade completa e VLibras",
    description:
      "Ajuste o tamanho da fonte (A+ / A-), ative leitura em voz alta (pt-BR), régua de leitura, alto contraste e suporte em Libras.",
    accent: "from-emerald-500 to-teal-600",
    visual: (
      <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-700/50 space-y-3">
        <div className="flex flex-wrap gap-2">
          {["A+ / A-", "Voz em pt-BR", "Régua de leitura", "Alto contraste", "VLibras"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-700/60 text-xs font-extrabold text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              <Sparkles size={12} />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          <Accessibility size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          Preferências salvas automaticamente no seu navegador.
        </div>
      </div>
    ),
  },
];

export default function HomeShowcaseCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((cur) => (cur + 1) % SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  const current = SLIDES[index];
  const prev = () => setIndex((cur) => (cur - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((cur) => (cur + 1) % SLIDES.length);

  return (
    <section
      aria-label="Como funciona o Manual do NAO"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="w-full rounded-[2rem] bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/60 shadow-xl shadow-slate-900/[0.06] p-6 sm:p-8 space-y-6"
    >
      {/* Topo do carrossel */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-extrabold uppercase tracking-wider border border-sky-500/20">
          <BookOpen size={13} />
          Como funciona o Manual
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Slide anterior"
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 hover:bg-sky-50 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo slide"
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 hover:bg-sky-50 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Conteúdo animado do slide */}
      <div className="min-h-[275px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <span
                className={`inline-block text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r ${current.accent} bg-clip-text text-transparent`}
              >
                {current.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                {current.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                {current.description}
              </p>
            </div>

            <div>{current.visual}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar slide">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${slide.title}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === index
                  ? "w-8 bg-sky-500"
                  : "w-2.5 bg-slate-300 dark:bg-neutral-700 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-neutral-400">
          <Zap size={13} className="text-amber-500" />
          {index + 1} / {SLIDES.length}
        </span>
      </div>
    </section>
  );
}

