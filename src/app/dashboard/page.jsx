"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, stagger } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  Lock,
  MessageCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  Accessibility,
  Moon,
  Play,
  Settings,
  Sparkles,
  Sun,
  Trophy,
  User,
} from "lucide-react";
import Image from "next/image";
import { loadModules } from "@/data/moduleContent";
import SpotlightCard from "@/components/SpotlightCard";
import BorderGlowCard from "@/components/BorderGlowCard";
import ModuleCard from "@/components/ModuleCard";
import BlueprintBackground from "@/components/BlueprintBackground";
import { useAppShell } from "@/components/AppShell";
import { calculateProfileProgress, userProfile } from "@/data/profileData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const forumTopics = [
  { title: "Como organizar a primeira aula com o NAO?", meta: "12 respostas" },
  { title: "Ideias de desafios para iniciantes", meta: "8 respostas" },
  { title: "Dúvidas sobre conexão e preparação", meta: "5 respostas" },
];

export default function Dashboard() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useAppShell();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.children[0].offsetWidth + 16; // card width + gap
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const modules = useMemo(() => loadModules(), []);
  const profileProgress = useMemo(() => calculateProfileProgress(modules), [modules]);
  
  // Master Timeline equivalents using Framer Motion (No NPM install required)
  const masterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const headerVariant = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const cardVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const carouselVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.12, delayChildren: 0.1 } 
    }
  };

  const stats = [
    { icon: Trophy, label: "Progresso", value: `${profileProgress.overallProgress}%`, sub: null, bar: profileProgress.overallProgress },
    { icon: Flame, label: "Sequência", value: "0 dias", sub: "Volte amanhã para iniciar sua série." },
    { icon: Award, label: "XP acumulado", value: `${profileProgress.earnedXp} XP`, sub: "Ganhe XP concluindo módulos." },
    { icon: Sparkles, label: "Conquistas", value: `${profileProgress.completedModules}/${profileProgress.totalModules}`, sub: "Uma conquista por módulo." },
  ];

  return (
    <div className="flex min-h-screen relative overflow-hidden transition-colors duration-500">
      <BlueprintBackground />
      
      {/* Sidebar (Desktop) */}
      <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-200/50 dark:border-neutral-700/50 shadow-sm transition-all duration-300 ${isSidebarOpen ? "w-64 lg:w-72" : "w-20"}`}>
        <div className={`p-4 h-16 sm:h-20 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} border-b border-neutral-200/50 dark:border-neutral-700/50 shrink-0`}>
          {isSidebarOpen && (
            <div className="flex items-center gap-3 cursor-pointer shrink-0 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
                <Image src="/nao.png" alt="NAO" width={24} height={24} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white truncate">
                Manual do NAO
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors shrink-0 flex items-center justify-center"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`flex-1 flex flex-col gap-6 p-4 ${isSidebarOpen ? 'sm:p-6' : 'items-center'} overflow-y-auto`}>
          {/* User Profile */}
          <div 
            onClick={() => router.push("/perfil")} 
            className={`flex items-center ${isSidebarOpen ? 'gap-3 p-3' : 'justify-center p-2 w-full'} rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 cursor-pointer transition-colors border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-sm shrink-0">
              <User size={20} />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-neutral-900 dark:text-white leading-none truncate">{userProfile.name}</span>
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-1">Nível {profileProgress.level}</span>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-700 shrink-0"></div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 w-full">
            <button className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold transition-colors w-full`} title="Dashboard">
              <Trophy size={18} />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            <button className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold transition-colors w-full`} title="Conquistas">
              <Award size={18} />
              {isSidebarOpen && <span>Conquistas</span>}
            </button>
            <button className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold transition-colors w-full`} title="Fórum">
              <MessageCircle size={18} />
              {isSidebarOpen && <span>Fórum</span>}
            </button>
            <button 
              onClick={() => document.querySelector('.accessibility-trigger')?.click()}
              className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold transition-colors w-full`} 
              title="Acessibilidade"
            >
              <Accessibility size={18} />
              {isSidebarOpen && <span>Acessibilidade</span>}
            </button>
            <button 
              onClick={() => document.querySelector('.vlibras-avatar')?.click()}
              className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold transition-colors w-full`} 
              title="VLibras"
            >
              {/* Custom VLibras Icon mimicking the original widget logo */}
              <div className="w-[18px] h-[18px] shrink-0 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center relative shadow-sm">
                <div className="absolute top-[5px] left-[4px] w-[3px] h-[3px] bg-white rounded-full opacity-90"></div>
                <div className="absolute top-[5px] right-[4px] w-[3px] h-[3px] bg-white rounded-full opacity-90"></div>
              </div>
              {isSidebarOpen && <span>VLibras</span>}
            </button>
          </nav>
        </div>

        <div className={`p-4 ${isSidebarOpen ? 'sm:p-6' : ''} border-t border-neutral-200/50 dark:border-neutral-700/50 flex flex-col gap-3 shrink-0`}>
          <button
            onClick={() => router.push("/modulo1")}
            className={`flex items-center justify-center ${isSidebarOpen ? 'gap-2 px-4' : 'px-0'} py-3 rounded-full bg-nao-secondary hover:bg-orange-600 text-white font-bold transition-colors shadow-md w-full`}
            title="Continuar missão"
          >
            <Play size={16} fill="currentColor" />
            {isSidebarOpen && <span>Continuar missão</span>}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center ${isSidebarOpen ? 'gap-2 px-4' : 'px-0'} py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold transition-colors w-full`}
            title="Alternar Tema"
          >
            {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-neutral-600" />}
            {isSidebarOpen && <span>{darkMode ? "Modo Claro" : "Modo Escuro"}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? "md:ml-64 lg:ml-72" : "md:ml-20"}`}>
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-sm h-16 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <Image src="/nao.png" alt="NAO" width={20} height={20} />
            </div>
            <span className="font-extrabold text-lg text-neutral-900 dark:text-white">Manual do NAO</span>
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </header>

        <main className="flex-1 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="conteudo-principal">

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
                  Bem-vindo de volta, <br className="hidden sm:block" />
                  <span className="text-nao-primary">Explorador</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                  Seu robô NAO aguarda. Avance pelos módulos, desvende os mistérios da robótica e acumule XP para subir de nível.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 text-xs font-bold">
                  {profileProgress.completedModules} de {profileProgress.totalModules} concluídos
                </div>
                <button
                  onClick={() => router.push("/modulo1")}
                  className="flex items-center gap-1.5 px-6 py-2 ml-2 rounded-full bg-nao-secondary hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Play size={14} />
                  Continuar
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
                const unlocked = mod.status === "Disponivel";
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
                      isLocked={!unlocked}
                      unlockLevel={mod.id}
                      onClick={() => unlocked && router.push(mod.route)}
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
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={18} className="text-sky-500" />
                <h2 className="font-bold text-neutral-900 dark:text-white">Fórum</h2>
              </div>
              <div className="forum-list space-y-2">
                {forumTopics.map((topic) => (
                  <div key={topic.title} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/40 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors cursor-pointer">
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{topic.title}</h3>
                    <span className="text-xs text-neutral-400">{topic.meta}</span>
                  </div>
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
    </div>
  );
}

