"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  CircleDashed,
  Sparkles,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { loadModules } from "@/data/moduleContent";
import { calculateProfileProgress, robotParts, userProfile } from "@/data/profileData";
import BlueprintBackground from "@/components/BlueprintBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const card =
  "bg-nao-card dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-700/50 shadow-soft";

export default function Perfil() {
  const router = useRouter();
  const modules = useMemo(() => loadModules(), []);
  const progress = useMemo(() => calculateProfileProgress(modules), [modules]);

  const metrics = [
    { icon: Zap, label: "XP acumulado", value: `${progress.earnedXp} XP`, tone: "text-amber-500" },
    { icon: Trophy, label: "Nível atual", value: `Nível ${progress.level}`, tone: "text-sky-500" },
    { icon: BookOpen, label: "Módulos concluídos", value: `${progress.completedModules}/${progress.totalModules}`, tone: "text-sky-500" },
    { icon: Award, label: "Peças liberadas", value: `${progress.unlockedParts}/${progress.totalRobotParts}`, tone: "text-orange-500" },
  ];

  return (
    <main id="conteudo-principal" className="min-h-screen">
      <BlueprintBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div initial="hidden" animate="visible" className="space-y-8">
          <motion.button
            variants={fadeUp}
            custom={0}
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-nao-body dark:text-neutral-400 hover:text-nao-primary transition-colors"
          >
            <ArrowLeft size={17} />
            Voltar ao dashboard
          </motion.button>

          <motion.section
            variants={fadeUp}
            custom={1}
            className={`flex flex-col sm:flex-row sm:items-center gap-5 p-6 sm:p-8 rounded-2xl ${card}`}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md shadow-sky-500/25">
              <Image src="/nao.png" alt="Avatar do perfil" width={58} height={48} />
            </div>
            <div className="flex-1">
              <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase border border-sky-500/20">
                Perfil do aluno
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-nao-title dark:text-white mt-2 tracking-tight">
                {userProfile.name}
              </h1>
              <p className="text-nao-body dark:text-neutral-400 mt-1 font-medium">
                Nível {progress.level} · {userProfile.journey}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 text-sm font-bold">
              <User size={17} />
              {userProfile.accountType}
            </div>
          </motion.section>

          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Resumo do perfil">
            {metrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                variants={fadeUp}
                custom={index + 2}
                className={`p-5 rounded-2xl ${card}`}
              >
                <metric.icon size={21} className={`${metric.tone} mb-3`} />
                <span className="text-sm text-nao-body dark:text-neutral-400 font-medium">{metric.label}</span>
                <strong className="block text-2xl font-extrabold text-nao-title dark:text-white mt-1">{metric.value}</strong>
              </motion.article>
            ))}
          </section>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
            <motion.section
              variants={fadeUp}
              custom={6}
              className={`p-6 sm:p-8 rounded-2xl space-y-7 ${card}`}
            >
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-extrabold tracking-widest uppercase border border-sky-500/20">
                  Sua evolução
                </span>
                <h2 className="text-2xl font-extrabold text-nao-title dark:text-white mt-3 tracking-tight">Progresso da jornada</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-nao-body dark:text-neutral-300">Progresso geral</span>
                  <strong className="text-sky-600 dark:text-sky-400">{progress.overallProgress}%</strong>
                </div>
                <div
                  className="h-3 rounded-full bg-slate-100 dark:bg-neutral-700 overflow-hidden"
                  role="progressbar"
                  aria-label="Progresso geral da jornada"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progress.overallProgress}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.overallProgress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-nao-body dark:text-neutral-300">Próximo nível</span>
                  <span className="text-nao-body dark:text-neutral-400 font-medium">
                    {progress.xpInCurrentLevel}/{progress.xpPerLevel} XP
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-neutral-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.levelProgress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-nao-locked-bg dark:bg-neutral-900/50">
                  <span className="text-xs text-nao-body dark:text-neutral-400 font-medium">Função</span>
                  <strong className="block text-nao-title dark:text-white mt-1">{userProfile.role}</strong>
                </div>
                <div className="p-4 rounded-2xl bg-nao-locked-bg dark:bg-neutral-900/50">
                  <span className="text-xs text-nao-body dark:text-neutral-400 font-medium">Dados salvos</span>
                  <strong className="block text-nao-title dark:text-white mt-1">Neste dispositivo</strong>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              custom={7}
              className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-900 text-white border border-sky-300/30 shadow-float"
            >
              <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-orange-300/20 blur-3xl" />
              <div className="relative grid sm:grid-cols-[0.8fr_1.2fr] gap-6 items-center">
                <div className="text-center">
                  <div className="relative mx-auto w-52 h-80 sm:w-60 sm:h-96" aria-label={`Robô ${progress.overallProgress}% completo`}>
                    <Image
                      src="/nao-3d-construcao.png"
                      alt="Estrutura do robô NAO em construção"
                      fill
                      sizes="(max-width: 640px) 208px, 240px"
                      className="object-contain grayscale opacity-25 contrast-75"
                    />
                    {robotParts.map((part) => {
                      const unlocked = progress.overallProgress >= part.threshold;
                      return (
                        <motion.div
                          key={part.name}
                          initial={false}
                          animate={{ opacity: unlocked ? 1 : 0, scale: unlocked ? 1 : 0.98 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                          style={{ clipPath: part.clipPath }}
                          aria-hidden="true"
                        >
                          <Image
                            src="/nao-3d-construcao.png"
                            alt=""
                            fill
                            sizes="(max-width: 640px) 208px, 240px"
                            className="object-contain drop-shadow-2xl"
                          />
                        </motion.div>
                      );
                    })}
                    <div
                      className="absolute inset-x-3 h-px bg-orange-300/80 shadow-[0_0_18px_4px_rgba(251,146,60,0.5)] transition-[bottom] duration-1000 ease-out"
                      style={{ bottom: `${progress.overallProgress}%` }}
                    />
                  </div>
                  <strong className="text-3xl font-extrabold">{progress.overallProgress}%</strong>
                  <span className="block text-xs uppercase tracking-widest text-sky-100 mt-1 font-bold">NAO construído</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Bot size={24} className="text-orange-300" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-sky-100">Projeto futuro</span>
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Construa seu próprio NAO</h2>
                  <p className="text-sm text-sky-50/90 leading-relaxed mt-2 font-medium">
                    Cada avanço na trilha libera uma nova parte do robô. Quanto mais XP você acumular, mais completo o seu NAO ficará.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    {robotParts.map((part) => {
                      const unlocked = progress.overallProgress >= part.threshold;
                      return (
                        <div
                          key={part.name}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${
                            unlocked ? "bg-white text-sky-700 shadow-sm" : "bg-white/10 text-sky-100/80"
                          }`}
                        >
                          {unlocked ? <CheckCircle2 size={14} className="text-orange-500" /> : <CircleDashed size={14} />}
                          <span>{part.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2 mt-5 text-xs text-sky-100/90 font-medium">
                    <Sparkles size={15} className="shrink-0 mt-0.5 text-orange-300" />
                    <span>A estrutura está pronta para receber futuramente conquistas, peças 3D e personalização do robô.</span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
