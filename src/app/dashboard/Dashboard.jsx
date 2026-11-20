"use client";

import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  Lock,
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
import SpotlightCard from "@/components/SpotlightCard";
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

export default function Dashboard({ name, forumTopics }) {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useAppShell();
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.children[0].offsetWidth + 16; // card width + gap
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const modules = useModules();
  const currentModule = getCurrentModule(modules);
  const profileProgress = useMemo(() => calculateProfileProgress(modules), [modules]);

  const stats = [
    { icon: Trophy, label: "Progresso", value: <CountUp to={profileProgress.overallProgress} suffix="%" />, sub: null, bar: profileProgress.overallProgress },
    { icon: Flame, label: "Sequência", value: "0 dias", sub: "Volte amanhã para iniciar sua série." },
    { icon: Award, label: "XP acumulado", value: <CountUp to={profileProgress.earnedXp} suffix=" XP" />, sub: "Ganhe XP concluindo módulos." },
    { icon: Sparkles, label: "Conquistas", value: `${profileProgress.completedModules}/${profileProgress.totalModules}`, sub: "Uma conquista por módulo." },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <BlueprintBackground />

      <main className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="conteudo-principal">

          <motion.div initial="hidden" animate="visible" variants={masterContainer}>
          {/* Supporting progress information */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            aria-label="Resumo de progresso"
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={headerVariant}>
                <BorderGlowCard
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm h-full"
                >
                <div className="flex items-center gap-2">
                  <stat.icon size={16} className="text-sky-500 dark:text-sky-400" />
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">{stat.label}</span>
                </div>
                <strong className="block text-xl font-black text-neutral-900 dark:text-white mt-1.5">{stat.value}</strong>
                {stat.bar !== undefined && (
                  <div className="mt-2 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400" style={{ width: `${stat.bar}%` }} />
                  </div>
                )}
                {stat.sub && <small className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mt-1.5 block">{stat.sub}</small>}
              </BorderGlowCard>
              </motion.div>
            ))}
          </section>

          {/* Main learning path */}
          <motion.section className="mb-8" aria-labelledby="modules-title">
            <div className="gsap-header flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
              <div className="max-w-2xl">
                <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase mb-3 border border-sky-500/20">
                  Trilha de Aprendizado
                </span>
                <h1 id="modules-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                  <SplitText text="Bem-vindo de volta," tag="span" delay={35} />
                  <br className="hidden sm:block" />
                  <SplitText text={name} tag="span" delay={45} className="break-words text-nao-primary" />
                </h1>
                <BlurText
                  text="Seu robô NAO aguarda. Avance pelos módulos, desvende os mistérios da robótica e acumule XP para subir de nível."
                  tag="p"
                  delay={30}
                  className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 text-xs font-bold">
                  {profileProgress.completedModules} de {profileProgress.totalModules} concluídos
                </div>
                <button
                  onClick={() => router.push(currentModule.route)}
                  className="flex items-center gap-1.5 px-6 py-2 ml-2 rounded-full bg-nao-secondary hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Play size={14} />
                  {isModuleCompleted(currentModule) ? "Revisar módulo" : "Continuar"}
                </button>
              </div>
            </div>

            <div className="relative group -mx-4 px-4 sm:mx-0 sm:px-0">
              <motion.div 
                ref={carouselRef}
                variants={carouselVariant}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              {modules.map((mod, i) => {
                const prerequisite = getModulePrerequisite(modules, mod.id);
                return (
                  <motion.div 
                    key={mod.id} 
                    variants={cardVariant}
                    className="flex shrink-0 snap-start w-[85vw] sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.66rem)] 2xl:w-[calc(25%-0.75rem)]"
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

              {/* Botão Flutuante - Esquerda */}
              <button 
                onClick={() => scrollCarousel('left')}
                className="absolute left-6 sm:-left-5 xl:-left-6 top-[calc(50%-1rem)] -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl shadow-black/10 text-neutral-700 dark:text-neutral-300 hover:bg-sky-50 dark:hover:bg-neutral-700 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 transition-all duration-500 focus:opacity-100"
                aria-label="Rolar para a esquerda"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Botão Flutuante - Direita */}
              <button 
                onClick={() => scrollCarousel('right')}
                className="absolute right-6 sm:-right-5 xl:-right-6 top-[calc(50%-1rem)] -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl shadow-black/10 text-neutral-700 dark:text-neutral-300 hover:bg-sky-50 dark:hover:bg-neutral-700 hover:text-sky-600 dark:hover:text-sky-400 hover:scale-110 transition-all duration-500 focus:opacity-100"
                aria-label="Rolar para a direita"
              >
                <ChevronRight size={28} />
              </button>
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

