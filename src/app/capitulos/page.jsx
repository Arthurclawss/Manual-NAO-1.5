"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const chapters = [
  {
    number: "Capítulo 1",
    title: "Introdução ao NAO",
    description: "Conheça os primeiros conceitos sobre o robô humanoide NAO.",
    locked: false,
    route: "/dashboard",
  },
  {
    number: "Capítulo 2",
    title: "Em breve",
    description: "Novos capítulos serão adicionados futuramente.",
    locked: true,
    route: null,
  },
];

export default function Capitulos() {
  const router = useRouter();

  return (
    <main id="conteudo-principal" className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] bg-tech-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <motion.div initial="hidden" animate="visible" className="space-y-8">
          <motion.button
            variants={fadeUp}
            custom={0}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Página principal
          </motion.button>

          <motion.div variants={fadeUp} custom={1} className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <BookOpen size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Escolha um capítulo</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Selecione um capítulo para iniciar sua jornada com o NAO.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.number}
                variants={fadeUp}
                custom={i + 2}
                onClick={() => !ch.locked && ch.route && router.push(ch.route)}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  ch.locked
                    ? "bg-neutral-50 dark:bg-neutral-800/30 border-neutral-100 dark:border-neutral-700/30 opacity-50 cursor-not-allowed"
                    : "bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/50 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                  {ch.number}
                </span>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">{ch.title}</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{ch.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
