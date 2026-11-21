"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
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
  { name: "Integrante 04", role: "Robótica educacional", area: "Robótica", initials: "04", color: "from-emerald-400 to-teal-600" },
  { name: "Integrante 05", role: "Design e interface", area: "UI / UX", initials: "05", color: "from-sky-500 to-cyan-600" },
  { name: "Integrante 06", role: "Documentação técnica", area: "Docs", initials: "06", color: "from-violet-500 to-purple-600" },
  { name: "Integrante 07", role: "Testes e validação", area: "Qualidade", initials: "07", color: "from-orange-500 to-rose-500" },
  { name: "Integrante 08", role: "Apoio pedagógico", area: "Ensino", initials: "08", color: "from-teal-500 to-emerald-600" },
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="conteudo-principal">
        <motion.div initial="hidden" animate="visible" className="space-y-10">
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
            className={`p-7 sm:p-10 rounded-3xl ${cardSurface}`}
          >
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase border border-sky-500/20">
                  <Heart size={13} />
                  Conheça o Projeto
                </span>
                <SplitText
                  text="Quem está por trás do Manual do NAO"
                  tag="h1"
                  delay={35}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight"
                />
                <BlurText
                  text="Conheça a equipe, o laboratório e os pilares educacionais que transformam o aprendizado com o robô humanoide NAO em uma trilha interativa e acessível."
                  tag="p"
                  delay={28}
                  className="text-neutral-600 dark:text-neutral-400 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-sky-50/90 dark:bg-sky-950/35 border border-sky-200/70 dark:border-sky-800/40 text-center">
                  <strong className="block text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">
                    <CountUp to={8} />
                  </strong>
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 mt-1 block">
                    Integrantes
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50/90 dark:bg-orange-950/30 border border-orange-200/70 dark:border-orange-800/40 text-center">
                  <strong className="block text-2xl sm:text-3xl font-black text-orange-500">
                    <CountUp to={8} />
                  </strong>
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 mt-1 block">
                    Módulos
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 text-center">
                  <strong className="block text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    <CountUp to={100} suffix="%" />
                  </strong>
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 mt-1 block">
                    Acessível
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Context Cards */}
          <section aria-label="Pilares do projeto" className="grid md:grid-cols-3 gap-4">
            {projectContexts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={slideUp} custom={i + 2}>
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
            })}
          </section>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map((member, i) => (
                <motion.div key={member.name} variants={slideUp} custom={i * 0.4 + 6}>
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
              ))}
            </div>
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
