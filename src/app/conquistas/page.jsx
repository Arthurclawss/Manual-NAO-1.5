"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  Compass,
  Cpu,
  Crown,
  Flame,
  GraduationCap,
  Lock,
  MessageCircle,
  Sparkles,
  Trophy,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import BlueprintBackground from "@/components/BlueprintBackground";
import { useModules } from "@/components/useModules";
import {
  ACHIEVEMENT_CATEGORIES,
  RARITY_STYLES,
  evaluateAchievements,
} from "@/data/achievementsData";
import { calculateProfileProgress } from "@/data/profileData";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";

const ICONS = {
  compass: Compass,
  book: BookOpen,
  graduation: GraduationCap,
  crown: Crown,
  cpu: Cpu,
  wrench: Wrench,
  bot: Bot,
  zap: Zap,
  trophy: Trophy,
  sparkles: Sparkles,
  message: MessageCircle,
  flame: Flame,
};

const SHIELD_THEMES = {
  Comum: {
    fill: "url(#shield-comum)",
    stroke: "#10b981",
    pill: "bg-emerald-500 text-white",
  },
  Rara: {
    fill: "url(#shield-rara)",
    stroke: "#0ea5e9",
    pill: "bg-sky-500 text-white",
  },
  Épica: {
    fill: "url(#shield-epica)",
    stroke: "#8b5cf6",
    pill: "bg-violet-500 text-white",
  },
  Lendária: {
    fill: "url(#shield-lendaria)",
    stroke: "#f59e0b",
    pill: "bg-amber-500 text-slate-950",
  },
};

const slideUp = {
  hidden: { y: 18 },
  visible: (i = 0) => ({
    y: 0,
    transition: { delay: i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardSurface =
  "bg-white/95 dark:bg-neutral-800/70 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/50 shadow-md shadow-slate-900/[0.05]";

export default function ConquistasPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMedal, setSelectedMedal] = useState(null);

  const modules = useModules();
  const summary = useMemo(() => evaluateAchievements(modules), [modules]);
  const profileStats = useMemo(() => calculateProfileProgress(modules), [modules]);

  const filteredAchievements = useMemo(() => {
    return summary.achievements.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "unlocked" && item.unlocked) ||
        (statusFilter === "locked" && !item.unlocked);
      return matchesCategory && matchesStatus;
    });
  }, [summary.achievements, selectedCategory, statusFilter]);

  const personalRecords = [
    {
      label: "XP Acumulado",
      sub: `Nível ${profileStats.level}`,
      value: <CountUp to={profileStats.earnedXp} />,
      icon: Zap,
      bg: "from-amber-950 via-stone-900 to-neutral-950 border-amber-500/40",
      glow: "bg-amber-400/20",
      iconColor: "text-amber-300",
      numColor: "text-amber-300",
    },
    {
      label: "Módulos",
      sub: `de ${profileStats.totalModules} na trilha`,
      value: `${profileStats.completedModules}/${profileStats.totalModules}`,
      icon: BookOpen,
      bg: "from-sky-950 via-slate-900 to-neutral-950 border-sky-500/40",
      glow: "bg-sky-400/20",
      iconColor: "text-sky-300",
      numColor: "text-sky-300",
    },
    {
      label: "Peças do NAO",
      sub: `${profileStats.overallProgress}% montado`,
      value: `${profileStats.unlockedParts}/${profileStats.totalRobotParts}`,
      icon: Bot,
      bg: "from-indigo-950 via-slate-900 to-neutral-950 border-indigo-400/40",
      glow: "bg-indigo-400/20",
      iconColor: "text-indigo-300",
      numColor: "text-indigo-300",
    },
    {
      label: "Patente",
      sub: `${summary.unlockedCount}/${summary.totalCount} medalhas`,
      value: summary.rank,
      icon: Award,
      bg: "from-emerald-950 via-slate-900 to-neutral-950 border-emerald-500/40",
      glow: "bg-emerald-400/20",
      iconColor: "text-emerald-300",
      numColor: "text-emerald-300",
    },
  ];

  return (
    <main id="conteudo-principal" className="min-h-screen relative">
      <BlueprintBackground />

      {/* Definições de gradientes SVG dos escudos */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <linearGradient id="shield-comum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="shield-rara" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="shield-epica" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="shield-lendaria" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={slideUp}
          custom={0}
          className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl ${cardSurface}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div>
              <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-extrabold tracking-widest uppercase border border-amber-500/20">
                <Trophy size={13} />
                Sala de Troféus
              </span>
              <SplitText
                text="Suas Conquistas"
                tag="h1"
                delay={35}
                className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 sm:mt-3 tracking-tight"
              />
              <BlurText
                text="Desbloqueie medalhas de estudo, acompanhe seus recordes e ganhe XP bônus no Manual do NAO."
                tag="p"
                delay={30}
                className="hidden sm:flex text-neutral-600 dark:text-neutral-400 mt-1.5 max-w-2xl"
              />
            </div>

            <div className="w-full lg:w-72 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-neutral-600 dark:text-neutral-300">
                  Coleção ({summary.unlockedCount}/{summary.totalCount})
                </span>
                <span className="text-sky-600 dark:text-sky-400">
                  <CountUp to={summary.completionPercent} suffix="%" />
                </span>
              </div>
              <div
                className="h-2.5 sm:h-3 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden"
                role="progressbar"
                aria-label="Progresso total das conquistas"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={summary.completionPercent}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${summary.completionPercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-sky-500"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recordes Pessoais (Estilo cards escuros em carrossel no mobile, 4 colunas no desktop) */}
        <section aria-labelledby="records-title" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="records-title" className="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-white">
              Recordes Pessoais
            </h2>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              +{summary.bonusXp} XP em medalhas
            </span>
          </div>

          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {personalRecords.map((rec) => {
              const Icon = rec.icon;
              return (
                <article
                  key={rec.label}
                  className={`relative overflow-hidden w-[43vw] max-w-[175px] shrink-0 snap-start md:w-auto md:max-w-none rounded-2xl border bg-gradient-to-b ${rec.bg} p-4 text-center text-white shadow-md`}
                >
                  <div className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-xl ${rec.glow}`} />
                  <div className="relative flex flex-col items-center">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-2.5">
                      <Icon size={22} className={rec.iconColor} />
                    </div>
                    <strong className={`text-xl sm:text-2xl font-black tracking-tight ${rec.numColor}`}>
                      {rec.value}
                    </strong>
                    <span className="text-xs sm:text-sm font-extrabold text-white mt-1">
                      {rec.label}
                    </span>
                    <small className="text-[11px] text-white/65 mt-0.5">
                      {rec.sub}
                    </small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Filtros compactos */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-3" aria-label="Filtros de conquistas">
          <div className="flex overflow-x-auto gap-2 pb-1 md:flex-wrap md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
            {ACHIEVEMENT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-white/95 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 border border-slate-300/85 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="inline-flex p-1 rounded-xl bg-white/95 dark:bg-neutral-800/75 border border-slate-300/85 dark:border-neutral-700 self-start">
            {[
              { id: "all", label: "Todas" },
              { id: "unlocked", label: "Desbloqueadas" },
              { id: "locked", label: "Bloqueadas" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
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

        {/* Grade de Medalhas (3 colunas no mobile estilo Duolingo, 4–6 colunas no desktop) */}
        <section aria-labelledby="awards-title" className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl space-y-5 ${cardSurface}`}>
          <div className="flex items-center justify-between gap-2">
            <h2 id="awards-title" className="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-white">
              Medalhas ({filteredAchievements.length})
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
              Toque em uma medalha para ver detalhes
            </span>
          </div>

          {filteredAchievements.length === 0 ? (
            <div className="py-10 text-center">
              <Lock size={28} className="mx-auto text-neutral-400 mb-3" />
              <p className="font-bold text-neutral-700 dark:text-neutral-200">
                Nenhuma conquista encontrada para esse filtro.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 sm:gap-6">
              {filteredAchievements.map((item) => {
                const Icon = ICONS[item.iconKey] || Trophy;
                const shield = SHIELD_THEMES[item.rarity] || SHIELD_THEMES.Comum;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMedal(item)}
                    className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
                  >
                    {/* Escudo da medalha */}
                    <div className="relative w-20 h-22 sm:w-24 sm:h-26 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <svg
                        viewBox="0 0 100 112"
                        className="w-full h-full drop-shadow-md"
                        aria-hidden="true"
                      >
                        <path
                          d="M50 4 L90 18 V54 C90 80 72 98 50 108 C28 98 10 80 10 54 V18 Z"
                          fill={item.unlocked ? shield.fill : "currentColor"}
                          className={item.unlocked ? "" : "text-slate-200 dark:text-neutral-800"}
                          stroke={item.unlocked ? shield.stroke : "#94a3b8"}
                          strokeWidth="4"
                        />
                        <path
                          d="M50 12 L82 23 V53 C82 74 67 89 50 98 C33 89 18 74 18 53 V23 Z"
                          fill="none"
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="2"
                        />
                      </svg>

                      <div
                        className={`absolute inset-0 flex items-center justify-center pb-2 ${
                          item.unlocked
                            ? "text-white drop-shadow"
                            : "text-slate-400 dark:text-neutral-500"
                        }`}
                      >
                        {item.unlocked ? <Icon size={28} /> : <Lock size={24} />}
                      </div>

                      {/* Pill de XP na base do escudo */}
                      <span
                        className={`absolute -bottom-1 px-2 py-0.5 rounded-full text-[11px] font-black shadow-sm border border-white/60 dark:border-neutral-900 ${
                          item.unlocked
                            ? shield.pill
                            : "bg-slate-300 text-slate-700 dark:bg-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        +{item.xpReward}
                      </span>
                    </div>

                    <h3
                      className={`mt-2.5 text-xs sm:text-sm font-extrabold leading-tight line-clamp-2 ${
                        item.unlocked
                          ? "text-neutral-900 dark:text-white"
                          : "text-slate-500 dark:text-neutral-400"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`mt-0.5 text-[11px] font-bold ${
                        item.unlocked
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-neutral-500"
                      }`}
                    >
                      {item.unlocked ? "Concluída" : `${item.progress}%`}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Modal de detalhes ao clicar em uma medalha */}
      {selectedMedal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes da conquista ${selectedMedal.title}`}
          onClick={() => setSelectedMedal(null)}
          className="fixed inset-0 z-[950] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 shadow-2xl p-6 space-y-5"
          >
            {(() => {
              const Icon = ICONS[selectedMedal.iconKey] || Trophy;
              const rarity = RARITY_STYLES[selectedMedal.rarity] || RARITY_STYLES.Comum;
              return (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          selectedMedal.unlocked
                            ? `bg-gradient-to-br ${rarity.iconBg} text-white shadow-md`
                            : "bg-slate-200 dark:bg-neutral-800 text-slate-500"
                        }`}
                      >
                        {selectedMedal.unlocked ? <Icon size={24} /> : <Lock size={22} />}
                      </div>
                      <div>
                        <span className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${rarity.badge}`}>
                          {selectedMedal.rarity} · +{selectedMedal.xpReward} XP
                        </span>
                        <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mt-1">
                          {selectedMedal.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Fechar detalhes"
                      onClick={() => setSelectedMedal(null)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {selectedMedal.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={selectedMedal.unlocked ? "text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1" : "text-slate-600 dark:text-neutral-400"}>
                        {selectedMedal.unlocked && <CheckCircle2 size={14} />}
                        {selectedMedal.unlocked ? "Conquista desbloqueada!" : selectedMedal.hint}
                      </span>
                      <span>{selectedMedal.progress}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${selectedMedal.unlocked ? "bg-emerald-500" : "bg-sky-500"}`}
                        style={{ width: `${selectedMedal.progress}%` }}
                      />
                    </div>
                  </div>

                  {!selectedMedal.unlocked && selectedMedal.actionHref && (
                    <button
                      type="button"
                      onClick={() => {
                        const href = selectedMedal.actionHref;
                        setSelectedMedal(null);
                        router.push(href);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {selectedMedal.actionLabel}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </main>
  );
}
