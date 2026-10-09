"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  FlaskConical,
  Heart,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useAppShell } from "@/components/AppShell";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const teamMembers = [
  { name: "Integrante 01", role: "Pesquisa e conteúdo", initials: "01", color: "from-emerald-500 to-emerald-600" },
  { name: "Integrante 02", role: "Desenvolvimento web", initials: "02", color: "from-green-400 to-emerald-500" },
  { name: "Integrante 03", role: "Experiência educacional", initials: "03", color: "from-emerald-600 to-green-800" },
  { name: "Integrante 04", role: "Robótica educacional", initials: "04", color: "from-emerald-500 to-emerald-600" },
  { name: "Integrante 05", role: "Design e interface", initials: "05", color: "from-green-400 to-emerald-500" },
  { name: "Integrante 06", role: "Documentação", initials: "06", color: "from-emerald-600 to-green-800" },
  { name: "Integrante 07", role: "Testes e validação", initials: "07", color: "from-emerald-500 to-emerald-600" },
  { name: "Integrante 08", role: "Apoio pedagógico", initials: "08", color: "from-green-400 to-emerald-500" },
];

const projectContexts = [
  {
    icon: <Building2 size={24} />,
    title: "Instituição",
    text: "Universidade Federal de Tecnologia e Inovação",
    detail: "Apoio acadêmico para aproximar robótica, ensino e tecnologia.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: <FlaskConical size={24} />,
    title: "Laboratório",
    text: "Laboratório de Robótica Aplicada à Educação",
    detail: "Espaço de pesquisa, testes com o NAO e criação de experiências educacionais.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <Users size={24} />,
    title: "Comunidade",
    text: "Estudantes, educadores e pesquisadores",
    detail: "O manual foi pensado para quem está dando os primeiros passos com robótica.",
    color: "from-emerald-600 to-green-800",
  },
];

export default function Projeto() {
  const { darkMode, toggleDarkMode } = useAppShell();

  return (
    <div>
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] bg-tech-grid transition-colors duration-500">
        {/* Navbar */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Image src="/nao.png" alt="NAO" width={24} height={24} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">
                Manual do NAO
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-neutral-600" />}
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="conteudo-principal">
          <motion.div initial="hidden" animate="visible" className="space-y-12">
            <motion.button
              variants={fadeUp}
              custom={0}
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Voltar
            </motion.button>

            {/* Hero */}
            <motion.section variants={fadeUp} custom={1} className="text-center space-y-5">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/25">
                <Heart size={28} className="text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Manual do NAO</span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white">Quem está por trás do projeto</h1>
              <p className="max-w-xl mx-auto text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Conheça os componentes, o laboratório e o ambiente de pesquisa que ajudam a transformar o aprendizado com o NAO em uma experiência mais acessível.
              </p>
            </motion.section>

            {/* Team */}
            <motion.section variants={fadeUp} custom={2} aria-labelledby="team-title" className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Componentes</span>
                <h2 id="team-title" className="text-2xl font-bold text-neutral-900 dark:text-white">Equipe do projeto</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                  Cada pessoa contribui com uma parte da experiência: pesquisa, desenvolvimento, organização do conteúdo e olhar educacional.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teamMembers.map((member, i) => (
                  <motion.article
                    key={member.name}
                    variants={fadeUp}
                    custom={i + 3}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 text-center hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                  >
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-sm shadow-md mb-3`}>
                      {member.initials}
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{member.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{member.role}</p>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            {/* Context Cards */}
            <section className="space-y-4" aria-label="Contexto do projeto">
              {projectContexts.map((item, i) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  custom={i + 11}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm"
                >
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">{item.text}</p>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">{item.detail}</span>
                  </div>
                </motion.article>
              ))}
            </section>

            {/* Motivation */}
            <motion.section
              variants={fadeUp}
              custom={14}
              className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/20"
            >
              <h2 className="text-2xl font-bold">Por que esse manual existe?</h2>
              <p className="mt-3 text-emerald-100/80 leading-relaxed">
                O projeto nasceu para tornar o primeiro contato com o robô NAO mais claro, acolhedor e visual. Em vez de depender apenas de documentos técnicos, o Manual do NAO organiza explicações, capítulos e caminhos de aprendizagem para estudantes e educadores.
              </p>
            </motion.section>

            {/* Thanks */}
            <motion.div
              variants={fadeUp}
              custom={15}
              className="text-center p-8 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Um projeto feito por pessoas, para pessoas.</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                A tecnologia fica mais interessante quando mostra quem pesquisa, ensina, testa e aprende junto.
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700/50 grid md:grid-cols-3 gap-8 text-sm text-neutral-500 dark:text-neutral-400">
            <div>
              <strong className="block text-neutral-900 dark:text-white mb-2">Créditos</strong>
              <span>Manual do NAO – Equipe de Robótica Educacional</span>
            </div>
            <div>
              <strong className="block text-neutral-900 dark:text-white mb-2">Contato</strong>
              <span className="flex items-center gap-2"><Mail size={14} /> contato@manualdonow.com</span>
              <span className="flex items-center gap-2 mt-1"><Phone size={14} /> (00) 0000-0000</span>
            </div>
            <div>
              <strong className="block text-neutral-900 dark:text-white mb-2">Endereço</strong>
              <span className="flex items-center gap-2"><MapPin size={14} /> Laboratório de Robótica Aplicada à Educação</span>
              <span className="block mt-1">Campus Universitário – Cidade/UF</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
