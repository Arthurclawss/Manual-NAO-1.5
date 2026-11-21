"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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
  Zap,
} from "lucide-react";
import BlueprintBackground from "@/components/BlueprintBackground";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";
import { useModules } from "@/components/useModules";
import {
  ACHIEVEMENT_CATEGORIES,
  RARITY_STYLES,
  evaluateAchievements,
} from "@/data/achievementsData";

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

const slideUp = {
  hidden: { y: 18 },
  visible: (i = 0) => ({
    y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardSurface =
  "bg-white/95 dark:bg-neutral-800/60 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/50 shadow-md shadow-slate-900/[0.05]";

export default function ConquistasPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("all");
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const step = el.children[0].offsetWidth + 12;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const modules = useModules();
  const summary = useMemo(() => evaluateAchievements(modules), [modules]);

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

  const statsCards = [
    {
      icon: Trophy,
      label: "Desbloqueadas",
      value: `${summary.unlockedCount}/${summary.totalCount}`,
      tone: "text-amber-500",
    },
    {
      icon: Sparkles,
      label: "Conclusão",
      value: <CountUp to={summary.completionPercent} suffix="%" />,
      tone: "text-sky-500",
    },
    {
      icon: Zap,
      label: "XP de Conquistas",
      value: <CountUp to={summary.bonusXp} suffix=" XP" />,
      tone: "text-orange-500",
    },
    {
      icon: Award,
      label: "Patente Atual",
      value: summary.rank,
      tone: "text-emerald-500",
    },
  ];

  return (
    <main id="conteudo-principal" className="min-h-screen relative">
      <BlueprintBackground />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-5 sm:space-y-8">
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
                text="Acompanhe medalhas, marcos de aprendizado e recompensas liberadas conforme você avança no Manual do NAO."
                tag="p"
                delay={30}
                className="hidden sm:flex text-neutral-600 dark:text-neutral-400 mt-1.5 max-w-2xl"
              />
            </div>

            <div className="hidden md:block w-full lg:w-72 space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-neutral-600 dark:text-neutral-300">Progresso da coleção</span>
                <span className="text-sky-600 dark:text-sky-400">{summary.completionPercent}%</span>
              </div>
              <div
                className="h-3 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden"
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

        {/* Resumo compacto no mobile */}
        <section
          aria-label="Resumo de conquistas"
          className={`md:hidden overflow-hidden rounded-2xl ${cardSurface}`}
        >
          <div className="border-b border-slate-200 dark:border-neutral-700/70 px-3.5 py-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-neutral-300">Coleção concluída</span>
              <span className="text-sky-600 dark:text-sky-400">{summary.completionPercent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-sky-500"
                style={{ width: `${summary.completionPercent}%` }}
              />
            </div>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-neutral-700/70 py-2.5 text-center">
            <div className="px-2">
              <dt className="text-[11px] font-bold text-slate-600 dark:text-neutral-400">Medalhas</dt>
              <dd className="text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                {summary.unlockedCount}/{summary.totalCount}
              </dd>
            </div>
            <div className="px-2">
              <dt className="text-[11px] font-bold text-slate-600 dark:text-neutral-400">XP Bônus</dt>
              <dd className="text-sm font-black text-neutral-900 dark:text-white mt-0.5">
                {summary.bonusXp} XP
              </dd>
            </div>
            <div className="px-2">
              <dt className="text-[11px] font-bold text-slate-600 dark:text-neutral-400">Patente</dt>
              <dd className="text-sm font-black text-neutral-900 dark:text-white mt-0.5 truncate">
                {summary.rank}
              </dd>
            </div>
          </dl>
        </section>

        {/* Summary Metrics (Desktop) */}
        <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Resumo de conquistas">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.article
                key={stat.label}
                initial="hidden"
                animate="visible"
                variants={slideUp}
                custom={idx + 1}
                className={`p-5 rounded-2xl ${cardSurface}`}
              >
                <Icon size={22} className={`${stat.tone} mb-3`} />
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  {stat.label}
                </span>
                <strong className="block text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                  {stat.value}
                </strong>
              </motion.article>
            );
          })}
        </section>

        {/* Next Achievement Highlight */}
        {summary.nextAchievement && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={slideUp}
            custom={5}
            className="relative overflow-hidden p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700 text-white shadow-lg"
          >
            <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-sky-100 bg-white/15 px-3 py-1 rounded-full">
                  Próxima conquista em foco
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                  {summary.nextAchievement.title} (+{summary.nextAchievement.xpReward} XP)
                </h2>
                <p className="text-xs sm:text-sm text-sky-50/90">
                  {summary.nextAchievement.hint}
                </p>
                <div className="pt-2 max-w-md space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-sky-100">
                    <span>Progresso atual</span>
                    <span>{summary.nextAchievement.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-300 transition-all duration-500"
                      style={{ width: `${summary.nextAchievement.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(summary.nextAchievement.actionHref)}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-sky-700 hover:bg-sky-50 font-extrabold text-sm shadow-md transition-colors"
              >
                {summary.nextAchievement.actionLabel}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.section>
        )}

        {/* Filters */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4" aria-label="Filtros de conquistas">
          <div className="flex overflow-x-auto gap-2 pb-1 md:flex-wrap md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
            {ACHIEVEMENT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                  selectedCategory === category
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-white/90 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 border border-slate-300/85 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="inline-flex p-1 rounded-xl bg-white/80 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 self-start">
            {[
              { id: "all", label: "Todas" },
              { id: "unlocked", label: "Desbloqueadas" },
              { id: "locked", label: "Bloqueadas" },
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

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <div className={`p-10 rounded-3xl text-center ${cardSurface}`}>
            <Lock size={28} className="mx-auto text-neutral-400 mb-3" />
            <p className="font-bold text-neutral-700 dark:text-neutral-200">
              Nenhuma conquista encontrada para esse filtro.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Tente selecionar outra categoria ou exibir todas as conquistas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Cabeçalho do carrossel no mobile */}
            <div className="flex items-center justify-between md:hidden">
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Medalhas ({filteredAchievements.length})
              </h2>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Conquistas anteriores"
                  className="grid size-9 place-items-center rounded-xl border border-slate-300/85 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  aria-label="Próximas conquistas"
                  className="grid size-9 place-items-center rounded-xl border border-slate-300/85 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <section
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0"
              style={{ scrollbarWidth: "none" }}
              aria-label="Lista de conquistas"
            >
              {filteredAchievements.map((item, idx) => {
                const Icon = ICONS[item.iconKey] || Trophy;
                const rarity = RARITY_STYLES[item.rarity] || RARITY_STYLES.Comum;

                return (
                  <motion.article
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                    custom={idx * 0.4}
                    className={`w-[82vw] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none p-4 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between gap-4 sm:gap-5 ${
                      item.unlocked
                        ? `bg-white/95 dark:bg-neutral-800/80 ${rarity.glow} shadow-md shadow-slate-900/[0.05]`
                        : "bg-slate-100/95 dark:bg-neutral-900/60 border-slate-300/85 dark:border-neutral-800"
                    }`}
                  >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          item.unlocked
                            ? `bg-gradient-to-br ${rarity.iconBg} text-white shadow-md`
                            : "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {item.unlocked ? <Icon size={22} /> : <Lock size={20} />}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${rarity.badge}`}>
                          {item.rarity}
                        </span>
                        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          +{item.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/50">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span
                        className={
                          item.unlocked
                            ? "inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                            : "text-neutral-500 dark:text-neutral-400"
                        }
                      >
                        {item.unlocked && <CheckCircle2 size={14} />}
                        {item.unlocked ? "Desbloqueada" : item.hint}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 shrink-0 ml-2">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.unlocked
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                            : "bg-sky-400/80"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.article>
                );
              })}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

