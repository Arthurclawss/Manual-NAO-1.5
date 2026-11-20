"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Flame,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Play,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react";
import { getCurrentModule, getModulePrerequisite, isModuleCompleted } from "@/data/moduleContent";
import { useModules } from "@/components/useModules";
import BorderGlowCard from "@/components/BorderGlowCard";
import ModuleCard from "@/components/ModuleCard";
import BlueprintBackground from "@/components/BlueprintBackground";
import { useAppShell } from "@/components/AppShell";
import { calculateProfileProgress } from "@/data/profileData";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";

const masterContainer = {
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const headerVariant = {
  hidden: { y: 16 },
  visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { y: 8 },
  visible: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const carouselVariant = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const carouselControl = "grid size-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-sky-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 md:absolute md:top-[calc(50%-1rem)] md:z-20 md:size-12 md:-translate-y-1/2 md:rounded-full md:shadow-xl md:shadow-black/10";

export default function Dashboard({ name, forumTopics }) {
  const { darkMode, toggleDarkMode } = useAppShell();
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    const [first, second] = carousel?.children ?? [];
    if (!second) return;
    carousel.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft) });
  };

  const modules = useModules();
  const currentModule = getCurrentModule(modules);
  const profileProgress = useMemo(() => calculateProfileProgress(modules), [modules]);

  const stats = [
    { icon: Flame, label: "Sequência", value: "0 dias", hint: "Volte amanhã para iniciar sua série." },
    { icon: Award, label: "XP acumulado", value: <CountUp to={profileProgress.earnedXp} suffix=" XP" />, hint: "Ganhe XP concluindo módulos." },
    { icon: Sparkles, label: "Conquistas", value: `${profileProgress.completedModules}/${profileProgress.totalModules}`, hint: "Uma conquista por módulo." },
  ];
  const desktopStats = [
    { icon: Trophy, label: "Progresso", value: <CountUp to={profileProgress.overallProgress} suffix="%" /> },
    ...stats,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <BlueprintBackground />

      <main className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-10" id="conteudo-principal">

          <motion.div initial="hidden" animate="visible" variants={masterContainer}>
          <section className="mb-8 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4" aria-label="Resumo de progresso">
            {desktopStats.map(({ icon: Icon, label, value, hint }) => (
              <motion.div key={label} variants={headerVariant}>
                <BorderGlowCard className="h-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700/50 dark:bg-neutral-800/60">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="shrink-0 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{label}</span>
                  </div>
                  <strong className="mt-1.5 block text-xl font-black text-neutral-900 dark:text-white">{value}</strong>
                  {hint ? (
                    <small className="mt-1.5 block text-[11px] font-medium text-neutral-400 dark:text-neutral-500">{hint}</small>
                  ) : (
                    <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400" style={{ width: `${profileProgress.overallProgress}%` }} />
                    </div>
                  )}
                </BorderGlowCard>
              </motion.div>
            ))}
          </section>

          {/* Main learning path */}
          <motion.section className="mb-5 md:mb-8" aria-labelledby="modules-title">
            <div className="mb-4 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-5">
              <div className="max-w-2xl">
                <span className="hidden md:inline-block py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase mb-3 border border-sky-500/20">
                  Trilha de Aprendizado
                </span>
                <h1 id="modules-title" className="text-2xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                  <SplitText text="Bem-vindo de volta," tag="span" delay={35} />
                  {" "}
                  <br className="hidden md:block" />
                  <SplitText text={name} tag="span" delay={45} className="break-words text-nao-primary" />
                </h1>
                <BlurText
                  text="Seu robô NAO aguarda. Avance pelos módulos, desvende os mistérios da robótica e acumule XP para subir de nível."
                  tag="p"
                  delay={30}
                  className="hidden md:block mt-3 text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:block px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 text-xs font-bold">
                  {profileProgress.completedModules} de {profileProgress.totalModules} concluídos
                </div>
                <Link
                  href={currentModule.route}
                  className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-nao-secondary px-4 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-orange-600 md:ml-2 md:min-h-0 md:flex-none md:px-6 md:text-xs"
                >
                  <Play size={14} />
                  {isModuleCompleted(currentModule) ? "Revisar módulo" : "Continuar"}
                </Link>
                <Link href="/capitulos" className="inline-flex min-h-11 items-center justify-center rounded-full border border-sky-200 bg-white px-3 text-sm font-bold text-sky-800 transition-colors hover:bg-sky-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-sky-300 dark:hover:bg-neutral-800 md:hidden">
                  Capítulos
                </Link>
              </div>
            </div>

            <motion.section
              variants={headerVariant}
              aria-label="Resumo de progresso"
              className="mb-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:hidden dark:border-neutral-700/70 dark:bg-neutral-900/90"
            >
              <div className="border-b border-neutral-200 px-3 py-2.5 sm:px-4 dark:border-neutral-700/70">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    <Trophy size={15} className="shrink-0 text-sky-600 dark:text-sky-400" aria-hidden="true" /> Progresso
                  </h2>
                  <strong className="text-sm font-black text-neutral-900 tabular-nums dark:text-white">
                    <CountUp to={profileProgress.overallProgress} suffix="%" />
                  </strong>
                </div>
                <div aria-hidden="true" className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 motion-safe:transition-[width] duration-300" style={{ width: `${profileProgress.overallProgress}%` }} />
                </div>
              </div>
              <dl className="grid grid-cols-3 divide-x divide-neutral-200 py-2 dark:divide-neutral-700/70">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="min-w-0 px-1.5 text-center sm:px-3">
                    <dt className="flex flex-wrap items-center justify-center gap-x-1 text-xs leading-tight font-bold text-neutral-600 dark:text-neutral-300">
                      <Icon size={14} className="hidden shrink-0 text-sky-600 sm:block dark:text-sky-400" aria-hidden="true" />
                      <span>{label}</span>
                    </dt>
                    <dd className="mt-0.5 text-sm font-black tabular-nums text-neutral-900 dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.section>

            <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
              <div className="mb-2 flex items-center justify-between gap-2 md:contents">
                <h2 className="text-base font-extrabold text-neutral-900 md:sr-only dark:text-white">Módulos</h2>
                <div className="flex gap-1.5 md:contents">
                  <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Módulos anteriores" className={`${carouselControl} md:-left-5 xl:-left-6`}>
                    <ChevronLeft className="size-5 md:size-7" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => scrollCarousel(1)} aria-label="Próximos módulos" className={`${carouselControl} md:-right-5 xl:-right-6`}>
                    <ChevronRight className="size-5 md:size-7" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <motion.div 
                ref={carouselRef}
                variants={carouselVariant}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 motion-safe:scroll-smooth md:gap-4 md:pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              {modules.map((mod) => {
                const prerequisite = getModulePrerequisite(modules, mod.id);
                return (
                  <motion.div 
                    key={mod.id} 
                    variants={cardVariant}
                    className="flex shrink-0 snap-start w-[86%] md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.66rem)] 2xl:w-[calc(25%-0.75rem)]"
                  >
                    <ModuleCard
                      id={String(mod.id).padStart(2, '0')}
                      title={mod.title}
                      summary={mod.summary}
                      icon={
                        <div className="flex flex-col items-center justify-center leading-none">
                          <span className="text-lg font-black">{mod.xp}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 mt-0.5">XP</span>
                        </div>
                      }
                      progress={mod.progress}
                      isLocked={Boolean(prerequisite)}
                      prerequisiteId={mod.id - 1}
                      href={mod.route}
                    />
                  </motion.div>
                );
              })}
              </motion.div>

            </div>
          </motion.section>

          <motion.aside variants={headerVariant} className="grid lg:grid-cols-3 gap-4" aria-label="Recursos complementares">
            <div id="forum" className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={18} className="text-sky-500" />
                <h2 className="font-bold text-neutral-900 dark:text-white">Fórum</h2>
                <Link href="/forum" className="ml-auto text-sm font-bold text-sky-800 hover:underline dark:text-sky-300">Ver fórum</Link>
              </div>
              <div className="forum-list space-y-2">
                {forumTopics.length === 0 ? (
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">O fórum está aberto para as primeiras publicações.</p>
                ) : forumTopics.map((topic) => (
                  <article key={topic.id} className="rounded-xl bg-neutral-50 p-3 transition-colors hover:bg-neutral-100 dark:bg-neutral-700/40 dark:hover:bg-neutral-700/60">
                    <h3 className="break-words text-sm font-bold text-neutral-800 dark:text-neutral-100"><Link className="hover:underline" href={`/forum/${topic.id}`}>{topic.title}</Link></h3>
                    <span className="text-xs text-neutral-600 dark:text-neutral-300">{topic.replies} {topic.replies === 1 ? "resposta" : "respostas"}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className="text-sky-500" />
                <h2 className="font-bold text-neutral-900 dark:text-white">Próximas conquistas</h2>
              </div>
              <ul className="space-y-3">
                {["Primeiro acesso ao manual", "Concluir o módulo 1", "Publicar uma dúvida no fórum"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings size={18} className="text-neutral-500" />
                <h2 className="font-bold text-neutral-900 dark:text-white">Preferências</h2>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Ajuste a aparência da sua área de estudos.</p>
              <button
                onClick={toggleDarkMode}
                className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
              >
                {darkMode ? "Usar modo claro" : "Usar modo escuro"}
              </button>
            </div>
          </motion.aside>
          </motion.div>
        </main>
    </div>
  );
}

