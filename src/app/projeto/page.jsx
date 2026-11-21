"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { useAppShell } from "@/components/AppShell";
import BlueprintBackground from "@/components/BlueprintBackground";
import BorderGlowCard from "@/components/BorderGlowCard";
import SpotlightCard from "@/components/SpotlightCard";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";
import NaoLogo from "@/components/NaoLogo";

const slideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const teamMembers = [
  { name: "Integrante 01", role: "Pesquisa e conteúdo", area: "Conteúdo", initials: "01", color: "from-sky-400 to-blue-600" },
  { name: "Integrante 02", role: "Desenvolvimento web", area: "Engenharia", initials: "02", color: "from-indigo-500 to-violet-600" },
  { name: "Integrante 03", role: "Experiência educacional", area: "Pedagogia", initials: "03", color: "from-amber-400 to-orange-500" },
];

const projectContexts = [
  {
    icon: Building2,
    title: "Instituição",
    text: "Universidade do Estado do Rio Grande do Norte (UERN)",
    detail: "Apoio acadêmico para aproximar robótica, ensino e tecnologia de forma acessível.",
    color: "from-sky-400 to-blue-600",
  },
  {
    icon: FlaskConical,
    title: "Laboratório",
    text: "LAR – Laboratório de Aprendizagem Robótica",
    detail: "Espaço de pesquisa, testes práticos com o robô NAO e criação de experiências interativas.",
    href: "https://portal.uern.br/propeg/laboratorios/laboratorios_/lar-laboratorio-de-aprendizagem-robotica/",
    hrefLabel: "Conhecer o LAR no portal da UERN",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: Users,
    title: "Comunidade",
    text: "Estudantes, educadores e pesquisadores",
    detail: "Manual pensado para quem está dando os primeiros passos ou conduzindo aulas com o NAO.",
    color: "from-amber-400 to-orange-500",
  },
];

const cardSurface =
  "bg-white/95 dark:bg-neutral-800/65 backdrop-blur-md border border-slate-300/85 dark:border-neutral-700/50 shadow-md shadow-slate-900/[0.05]";

function MobileCarousel({ items, renderItem, label, breakpoint = "sm" }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hiddenClass = breakpoint === "md" ? "md:hidden" : "sm:hidden";

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    const child = track.children[clamped];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, idx) => {
      const dist = Math.abs(child.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });
    if (closest !== activeIndex) setActiveIndex(closest);
  };

  return (
    <div className={`${hiddenClass} space-y-3`}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={item.title || item.name} className="w-[85%] shrink-0 snap-center">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.title || item.name}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={activeIndex === i ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-6 bg-sky-500"
                  : "w-2 bg-neutral-300 dark:bg-neutral-700"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Slide anterior"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            aria-label="Próximo slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projeto() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useAppShell();

  return (
    <div className="min-h-screen relative transition-colors duration-500">
      <BlueprintBackground />

      {/* Header consistente com o Manual */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <NaoLogo size="md" />
            <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">
              Manual do NAO
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-neutral-600" />
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-nao-secondary hover:bg-orange-600 text-white font-bold text-sm shadow-sm transition-colors"
            >
              Acessar Manual
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12" id="conteudo-principal">
        <motion.div initial="hidden" animate="visible" className="space-y-5 sm:space-y-10">
          <motion.button
            variants={slideUp}
            custom={0}
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-bold"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </motion.button>

          {/* Hero */}
          <motion.section
            variants={slideUp}
            custom={1}
            className={`p-4 sm:p-10 rounded-2xl sm:rounded-3xl ${cardSurface}`}
          >
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 sm:gap-8 items-center">
              <div className="space-y-2 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 sm:py-1 sm:px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] sm:text-xs font-extrabold tracking-widest uppercase border border-sky-500/20">
                  <Heart size={12} />
                  Conheça o Projeto
                </span>
                <SplitText
                  text="Quem está por trás do Manual do NAO"
                  tag="h1"
                  delay={35}
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight"
                />
                <BlurText
                  text="Conheça a equipe, o laboratório e os pilares educacionais que transformam o aprendizado com o robô humanoide NAO em uma trilha interativa e acessível."
                  tag="p"
                  delay={28}
                  className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-snug sm:leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="flex min-w-0 flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-sky-200/70 bg-sky-50/90 px-2 py-2 text-center sm:p-4 dark:border-sky-800/40 dark:bg-sky-950/35">
                  <strong className="block whitespace-nowrap text-lg leading-none font-black text-sky-600 sm:text-2xl md:text-3xl dark:text-sky-400">
                    <CountUp to={teamMembers.length} />
                  </strong>
                  <span className="mt-1 block max-w-full truncate text-[11px] font-bold text-neutral-600 sm:mt-1.5 sm:text-xs dark:text-neutral-300">
                    Integrantes
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-orange-200/70 bg-orange-50/90 px-2 py-2 text-center sm:p-4 dark:border-orange-800/40 dark:bg-orange-950/30">
                  <strong className="block whitespace-nowrap text-lg leading-none font-black text-orange-500 sm:text-2xl md:text-3xl">
                    <CountUp to={8} />
                  </strong>
                  <span className="mt-1 block max-w-full truncate text-[11px] font-bold text-neutral-600 sm:mt-1.5 sm:text-xs dark:text-neutral-300">
                    Módulos
                  </span>
                </div>
                <div className="flex min-w-0 flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-emerald-200/70 bg-emerald-50/90 px-2 py-2 text-center sm:p-4 dark:border-emerald-800/40 dark:bg-emerald-950/30">
                  <strong className="block whitespace-nowrap text-lg leading-none font-black text-emerald-600 sm:text-2xl md:text-3xl dark:text-emerald-400">
                    <CountUp to={100} suffix="%" />
                  </strong>
                  <span className="mt-1 block max-w-full truncate text-[11px] font-bold text-neutral-600 sm:mt-1.5 sm:text-xs dark:text-neutral-300">
                    Acessível
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Context Cards */}
          {(() => {
            const renderContextCard = (item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={slideUp} custom={i + 2} className="h-full">
                  <BorderGlowCard className={`p-6 rounded-2xl h-full ${cardSurface}`}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md mb-4`}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {item.title}
                    </span>
                    <h2 className="font-extrabold text-lg text-neutral-900 dark:text-white mt-1">
                      {item.text}
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline mt-3"
                      >
                        {item.hrefLabel}
                        <ArrowRight size={13} />
                      </a>
                    )}
                  </BorderGlowCard>
                </motion.div>
              );
            };

            return (
              <section aria-label="Pilares do projeto">
                <MobileCarousel
                  items={projectContexts}
                  renderItem={renderContextCard}
                  label="Pilares do projeto"
                  breakpoint="md"
                />
                <div className="hidden md:grid md:grid-cols-3 gap-4">
                  {projectContexts.map(renderContextCard)}
                </div>
              </section>
            );
          })()}

          {/* Team */}
          <motion.section variants={slideUp} custom={5} aria-labelledby="team-title" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Componentes
                </span>
                <h2 id="team-title" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
                  Equipe do projeto
                </h2>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                Cada integrante contribui com pesquisa, desenvolvimento, organização didática e testes práticos com o robô.
              </p>
            </div>

            {(() => {
              const renderMemberCard = (member, i) => (
                <motion.div key={member.name} variants={slideUp} custom={i * 0.4 + 6} className="h-full">
                  <SpotlightCard className={`p-5 rounded-2xl h-full ${cardSurface} hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}
                      >
                        {member.initials}
                      </div>
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700/70 text-neutral-600 dark:text-neutral-300">
                        {member.area}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-neutral-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      {member.role}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );

              return (
                <>
                  <MobileCarousel
                    items={teamMembers}
                    renderItem={renderMemberCard}
                    label="Equipe do projeto"
                    breakpoint="sm"
                  />
                  <div className="hidden sm:grid sm:grid-cols-3 gap-4">
                    {teamMembers.map(renderMemberCard)}
                  </div>
                </>
              );
            })()}
          </motion.section>

          {/* Motivation + CTA */}
          <motion.section
            variants={slideUp}
            custom={10}
            className="relative overflow-hidden p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-blue-800 text-white shadow-xl"
          >
            <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-orange-400/20 blur-3xl" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-100 bg-white/15 px-3 py-1 rounded-full">
                  <Bot size={14} />
                  Por que esse manual existe?
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Um projeto feito por pessoas, para pessoas.
                </h2>
                <p className="text-sky-50/90 leading-relaxed text-sm sm:text-base">
                  O Manual do NAO nasceu para tornar o primeiro contato com o robô mais claro, visual e inclusivo — reunindo módulos gamificados, construção progressiva do robô, conquistas, fórum e recursos de acessibilidade.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-sky-700 hover:bg-sky-50 font-extrabold text-sm shadow-lg transition-colors"
              >
                <Sparkles size={16} className="text-orange-500" />
                Explorar o Manual
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.section>
        </motion.div>

        {/* Footer */}
        <footer className="mt-14 pt-8 border-t border-neutral-200/80 dark:border-neutral-700/60 grid md:grid-cols-3 gap-8 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <strong className="block text-neutral-900 dark:text-white mb-2">Créditos</strong>
            <span>Manual do NAO – LAR / UERN</span>
          </div>
          <div>
            <strong className="block text-neutral-900 dark:text-white mb-2">Contato</strong>
            <span className="flex items-center gap-2">
              <Mail size={14} /> contato@manualdonow.com
            </span>
            <span className="flex items-center gap-2 mt-1">
              <Phone size={14} /> (00) 0000-0000
            </span>
          </div>
          <div>
            <strong className="block text-neutral-900 dark:text-white mb-2">Endereço</strong>
            <a
              href="https://portal.uern.br/propeg/laboratorios/laboratorios_/lar-laboratorio-de-aprendizagem-robotica/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <MapPin size={14} /> LAR – Laboratório de Aprendizagem Robótica
            </a>
            <span className="block mt-1">Universidade do Estado do Rio Grande do Norte (UERN)</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
