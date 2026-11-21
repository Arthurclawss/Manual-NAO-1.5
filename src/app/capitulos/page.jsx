"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Play,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import BlueprintBackground from "@/components/BlueprintBackground";
import { useAppShell } from "@/components/AppShell";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";
import { useModules } from "@/components/useModules";
import {
  getCurrentModule,
  getModulePrerequisite,
  isModuleCompleted,
} from "@/data/moduleContent";
import { calculateProfileProgress } from "@/data/profileData";

const CHAPTER_GROUPS = [
  {
    number: "Capítulo 1",
    title: "Primeiros Passos com o NAO",
    description:
      "Conheça o robô humanoide NAO, a organização do sistema NAOqi e os cuidados iniciais de operação.",
    match: (mod) => mod.id <= 2,
  },
  {
    number: "Capítulo 2",
    title: "Anatomia, Movimento e Percepção",
    description:
      "Explore juntas, sensores, equilíbrio, postura e como o NAO enxerga, escuta e percebe o ambiente.",
    match: (mod) => mod.id >= 3 && mod.id <= 5,
  },
  {
    number: "Capítulo 3",
    title: "Comunicação e Programação",
    description:
      "Aprenda sobre fala, interação social, ferramentas de programação e novos comportamentos.",
    match: (mod) => mod.id >= 6,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardSurface =
  "bg-white/95 dark:bg-neutral-800/65 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/50 shadow-md shadow-slate-900/[0.05]";

function getModuleStatus(modules, mod, isAdmin) {
  if (isModuleCompleted(mod)) return "completed";
  if (!isAdmin && (mod.status === "Bloqueado" || getModulePrerequisite(modules, mod.id))) {
    return "locked";
  }
  return "available";
}

export default function Capitulos() {
  const router = useRouter();
  const { isAdmin } = useAppShell();
  const modules = useModules();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const chapterCarouselRefs = useRef({});

  const scrollChapter = (chapterKey, direction) => {
    const el = chapterCarouselRefs.current[chapterKey];
    if (!el || !el.children[0]) return;
    const step = el.children[0].offsetWidth + 12;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const progress = useMemo(() => calculateProfileProgress(modules), [modules]);
  const currentModule = useMemo(() => getCurrentModule(modules), [modules]);
  const currentModuleHref =
    currentModule?.route || `/modulos/${currentModule?.id || 1}`;

  const chapters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CHAPTER_GROUPS.map((group) => {
      const groupModules = modules.filter(group.match);
      const totalXp = groupModules.reduce((acc, m) => acc + (m.xp || 0), 0);
      const completedCount = groupModules.filter(isModuleCompleted).length;
      const chapterProgress =
        groupModules.length > 0
          ? Math.round(
              groupModules.reduce((acc, m) => acc + (m.progress || 0), 0) /
                groupModules.length
            )
          : 0;

      const filteredModules = groupModules.filter((mod) => {
        const status = getModuleStatus(modules, mod, isAdmin);
        const matchesStatus = statusFilter === "all" || status === statusFilter;
        const matchesQuery =
          !query ||
          mod.title.toLowerCase().includes(query) ||
          (mod.summary || "").toLowerCase().includes(query) ||
          (mod.tag || "").toLowerCase().includes(query);
        return matchesStatus && matchesQuery;
      });

      return {
        ...group,
        totalCount: groupModules.length,
        completedCount,
        totalXp,
        chapterProgress,
        modules: filteredModules,
      };
    }).filter((chapter) => chapter.modules.length > 0);
  }, [modules, searchQuery, statusFilter, isAdmin]);

  return (
    <main id="conteudo-principal" className="min-h-screen relative overflow-x-hidden">
      <BlueprintBackground />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-5 sm:space-y-8">
        {/* Cabeçalho com resumo da trilha */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl ${cardSurface}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 sm:py-1 sm:px-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-extrabold tracking-widest uppercase border border-emerald-500/20">
                <BookOpen size={12} />
                Trilha de Aprendizado
              </span>
              <SplitText
                text="Capítulos e Módulos"
                tag="h1"
                delay={35}
                className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
              />
              <BlurText
                text="Explore os capítulos organizados por tema, acompanhe seu progresso e avance pelos módulos do robô NAO."
                tag="p"
                delay={30}
                className="hidden sm:flex text-neutral-600 dark:text-neutral-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 sm:gap-4 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-bold overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <span className="shrink-0 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <CountUp to={progress.overallProgress} suffix="%" />
                  <span className="hidden sm:inline"> concluído</span>
                </span>
                <span className="shrink-0 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {progress.completedModules}/{progress.totalModules} módulos
                </span>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Zap size={12} />
                  {progress.earnedXp}<span className="hidden sm:inline">/{progress.totalXp}</span> XP
                </span>
              </div>

              <button
                type="button"
                onClick={() => router.push(currentModuleHref)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-full bg-nao-secondary hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Play size={14} fill="currentColor" />
                Continuar missão
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="mt-3.5 sm:mt-6">
            <div className="h-1.5 sm:h-2.5 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-sky-600 transition-all duration-500"
                style={{ width: `${progress.overallProgress}%` }}
              />
            </div>
          </div>
        </motion.section>

        {/* Busca e filtros rápidos */}
        <section
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          aria-label="Busca e filtros de módulos"
        >
          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar módulo por título ou assunto..."
              aria-label="Buscar módulo por título ou assunto"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex overflow-x-auto p-1 rounded-xl bg-white/85 dark:bg-neutral-800/75 border border-neutral-200 dark:border-neutral-700 self-start max-w-full" style={{ scrollbarWidth: "none" }}>
            {[
              { id: "all", label: "Todos" },
              { id: "available", label: "Disponíveis" },
              { id: "completed", label: "Concluídos" },
              { id: "locked", label: "Bloqueados" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === tab.id
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Lista de Capítulos */}
        {chapters.length === 0 ? (
          <div className={`p-10 rounded-3xl text-center ${cardSurface}`}>
            <Sparkles size={26} className="mx-auto text-neutral-400 mb-3" />
            <p className="font-bold text-neutral-800 dark:text-neutral-200">
              Nenhum módulo encontrado para essa busca.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Limpe o termo de busca ou altere o filtro de status.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {chapters.map((chapter, ci) => (
              <motion.section
                key={chapter.number}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={ci + 1}
                className={`min-w-0 overflow-hidden p-4 sm:p-7 rounded-2xl sm:rounded-3xl space-y-3.5 sm:space-y-5 ${cardSurface}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-neutral-200/70 dark:border-neutral-700/60">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      {chapter.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                      {chapter.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="w-full md:w-56 space-y-1.5 sm:space-y-2 shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-600 dark:text-neutral-300">
                      <span>
                        {chapter.completedCount}/{chapter.totalCount} concluídos
                      </span>
                      <span className="text-amber-600 dark:text-amber-400">
                        {chapter.totalXp} XP
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-500"
                        style={{ width: `${chapter.chapterProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Controles do carrossel no mobile */}
                {chapter.modules.length > 1 && (
                  <div className="flex items-center justify-between md:hidden">
                    <span className="text-xs font-bold text-slate-600 dark:text-neutral-400">
                      Deslize os módulos ({chapter.modules.length})
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => scrollChapter(chapter.number, -1)}
                        aria-label={`Módulo anterior do ${chapter.number}`}
                        className="grid size-8 place-items-center rounded-lg border border-slate-300/85 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollChapter(chapter.number, 1)}
                        aria-label={`Próximo módulo do ${chapter.number}`}
                        className="grid size-8 place-items-center rounded-lg border border-slate-300/85 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={(el) => {
                    chapterCarouselRefs.current[chapter.number] = el;
                  }}
                  className="flex min-w-0 overflow-x-auto snap-x snap-mandatory gap-3 pb-1 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0"
                  style={{ scrollbarWidth: "none" }}
                >
                  {chapter.modules.map((mod) => {
                    const status = getModuleStatus(modules, mod, isAdmin);
                    const isLocked = status === "locked";
                    const isDone = status === "completed";
                    const href = mod.route || `/modulos/${mod.id}`;

                    return (
                      <button
                        key={mod.id}
                        type="button"
                        disabled={isLocked}
                        onClick={() => !isLocked && router.push(href)}
                        className={`w-[72vw] min-w-[225px] max-w-[270px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                          isLocked
                            ? "bg-slate-100 dark:bg-neutral-900/50 border-slate-300/85 dark:border-neutral-800 cursor-not-allowed"
                            : "bg-white dark:bg-neutral-900/60 border-slate-300/85 dark:border-neutral-700/70 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md cursor-pointer"
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                              {mod.tag || `Módulo ${mod.id}`}
                            </span>

                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                                isDone
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : isLocked
                                    ? "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                    : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                              }`}
                            >
                              {isDone ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  Concluído
                                </>
                              ) : isLocked ? (
                                <>
                                  <Lock size={12} />
                                  Bloqueado
                                </>
                              ) : (
                                "Disponível"
                              )}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-neutral-900 dark:text-white leading-snug">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {mod.summary}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/50 w-full">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-amber-600 dark:text-amber-400">
                              +{mod.xp} XP
                            </span>
                            <span className="text-neutral-500 dark:text-neutral-400">
                              {mod.progress || 0}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isDone ? "bg-emerald-500" : "bg-sky-500"
                              }`}
                              style={{ width: `${mod.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
