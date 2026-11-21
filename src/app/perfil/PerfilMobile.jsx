"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BookOpen, Bot, CheckCircle2, ChevronDown, CircleDashed, Settings, Trophy, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";
import SignOutButton from "@/components/SignOutButton";
import SplitText from "@/components/SplitText";
import UserAvatar from "@/components/UserAvatar";
import { robotParts } from "@/data/profileData";

const card = "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900";
const disclosure = "group flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-bold [&::-webkit-details-marker]:hidden";
const easeOut = [0.22, 1, 0.36, 1];

function ProgressBar({ label, value, max = 100, color }) {
  const prefersReducedMotion = useReducedMotion();
  const targetWidth = `${(value / max) * 100}%`;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-700"
    >
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={prefersReducedMotion ? false : { width: 0 }}
        animate={{ width: targetWidth }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.22, ease: easeOut }}
      />
    </div>
  );
}

export default function PerfilMobile({ name, email, roleLabel, progress, visualLevel }) {
  const prefersReducedMotion = useReducedMotion();
  const {
    level, earnedXp, completedModules, totalModules, overallProgress,
    xpInCurrentLevel, xpPerLevel, unlockedParts, totalRobotParts,
  } = progress;
  const robotSizes = "(max-width: 420px) 45vw, 192px";
  const sectionMotion = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: easeOut },
        };
  const metrics = [
    { label: "XP acumulado", value: <CountUp to={earnedXp} suffix=" XP" duration={0.9} />, icon: Zap, tone: "text-amber-700 dark:text-amber-300" },
    { label: "Nível atual", value: <CountUp to={level} duration={0.8} />, icon: Trophy, tone: "text-sky-700 dark:text-sky-300" },
    { label: "Módulos concluídos", value: <><CountUp to={completedModules} duration={0.8} />/{totalModules}</>, icon: BookOpen, tone: "text-sky-700 dark:text-sky-300" },
    { label: "Peças liberadas", value: <><CountUp to={unlockedParts} duration={0.8} />/{totalRobotParts}</>, icon: Award, tone: "text-amber-700 dark:text-amber-300" },
  ];

  return (
    <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-4xl flex-col gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-6 sm:py-6 md:hidden">
      <motion.header
        {...sectionMotion(0)}
        className={`${card} relative z-10 flex items-center gap-3 border-t-4 border-t-sky-500 p-3 sm:gap-4 sm:p-4 dark:border-t-sky-500`}
      >
        <UserAvatar size="md" editable />
        <SplitText
          text={name}
          tag="h1"
          splitBy="words"
          delay={0.07}
          duration={0.45}
          className="min-w-0 text-xl leading-tight font-black tracking-tight text-nao-title [overflow-wrap:anywhere] sm:text-2xl dark:text-white"
        />
      </motion.header>

      <div className="grid flex-1 grid-rows-[auto_1fr] gap-2 sm:grid-cols-2 sm:grid-rows-1 sm:gap-4">
        <motion.section
          {...sectionMotion(0.08)}
          aria-labelledby="profile-progress"
          className={`${card} space-y-1.5 px-3 py-2 sm:space-y-4 sm:p-4`}
        >
          <h2 id="profile-progress" className="text-base font-black text-nao-title dark:text-white">Seu progresso</h2>
          <dl className="grid grid-cols-2 gap-1.5" aria-label="Indicadores do perfil">
            {metrics.map(({ label, value, icon: Icon, tone }, index) => (
              <motion.div
                key={label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.14 + index * 0.05, ease: easeOut }}
                className="flex min-w-0 flex-col justify-between gap-0.5 rounded-lg bg-slate-50 px-2 py-1 dark:bg-neutral-800"
              >
                <dt className="text-xs leading-tight font-bold text-nao-body dark:text-neutral-300">{label}</dt>
                <dd className="flex items-center justify-between gap-1 text-base leading-tight font-black text-nao-title tabular-nums dark:text-white">
                  <span>{value}</span>
                  <Icon size={14} className={`shrink-0 ${tone}`} aria-hidden="true" />
                </dd>
              </motion.div>
            ))}
          </dl>
          <div className="grid grid-cols-2 items-end gap-2">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-x-1 text-xs font-bold text-nao-body dark:text-neutral-300">
                <span>Progresso geral</span>
                <span className="text-sky-700 tabular-nums dark:text-sky-300">
                  <CountUp to={overallProgress} suffix="%" duration={0.9} />
                </span>
              </div>
              <ProgressBar label="Progresso geral" value={overallProgress} color="bg-sky-500" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-x-1 text-xs font-bold text-nao-body dark:text-neutral-300">
                <span>Próximo nível</span>
                <span className="text-amber-800 tabular-nums dark:text-amber-300">
                  <CountUp to={xpInCurrentLevel} duration={0.9} />/{xpPerLevel} XP
                </span>
              </div>
              <ProgressBar label="XP para o próximo nível" value={xpInCurrentLevel} max={xpPerLevel} color="bg-amber-500" />
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion(0.16)}
          aria-labelledby="profile-robot"
          className="flex flex-col rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-900 to-slate-950 px-3.5 pt-3 text-white shadow-sm sm:px-4 sm:pt-4"
        >
          <div className="flex items-center justify-between gap-2 pb-2">
            <h2 id="profile-robot" className="flex items-center gap-1.5 text-sm font-bold text-sky-100 sm:text-base">
              <Bot size={17} className="shrink-0 text-sky-300" aria-hidden="true" /> Seu robô NAO
            </h2>
            <p className="text-xl font-black tabular-nums text-white sm:text-2xl">
              <CountUp to={overallProgress} suffix="%" duration={0.9} />
            </p>
          </div>
          <div className="mb-2.5 grid h-[clamp(13rem,34dvh,18rem)] w-full place-items-center rounded-xl bg-white/5 p-2 [container-type:size]">
            <div className="relative aspect-[1053/1494] h-[min(100cqh,142cqw)] max-w-full">
              <Image src="/nao-3d-construcao.png" fill sizes={robotSizes} alt="Robô NAO em construção" className="object-contain grayscale opacity-50" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0"
                initial={prefersReducedMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: `inset(${100 - visualLevel}% 0 0 0)` }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.28, ease: easeOut }}
              >
                <Image src="/nao-3d-construcao.png" fill sizes={robotSizes} alt="" className="object-contain" />
              </motion.div>
              {visualLevel > 0 && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-x-0 h-px bg-amber-300 shadow-[0_0_8px_2px_rgba(251,146,60,0.5)]"
                  initial={prefersReducedMotion ? false : { bottom: "0%" }}
                  animate={{ bottom: `${visualLevel}%` }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.28, ease: easeOut }}
                />
              )}
            </div>
          </div>
          <details className="border-t border-white/20">
            <summary className={`${disclosure} text-sky-100`}>
              <ChevronDown size={16} aria-hidden="true" className="shrink-0 group-open:rotate-180" />
              Peças do robô
            </summary>
            <ul className="grid grid-cols-2 gap-1.5 pb-3">
              {robotParts.map((part) => {
                const unlocked = overallProgress >= part.threshold;
                const PartIcon = unlocked ? CheckCircle2 : CircleDashed;
                return (
                  <li key={part.name} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold ${unlocked ? "bg-white text-sky-900" : "bg-white/10 text-sky-100"}`}>
                    <PartIcon size={14} className="shrink-0" aria-hidden="true" />
                    <span>{part.name}<span className="sr-only"> {unlocked ? "(liberada)" : "(bloqueada)"}</span></span>
                  </li>
                );
              })}
            </ul>
          </details>
        </motion.section>
      </div>

      <motion.details {...sectionMotion(0.24)} className={`${card} px-3.5 sm:px-4`}>
        <summary className={`${disclosure} text-nao-title dark:text-white`}>
          <Settings size={16} className="shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
          Minha conta
          <ChevronDown size={16} className="shrink-0 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="border-t border-slate-200 py-3 dark:border-neutral-700 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="mb-2 min-w-0 space-y-1 text-sm text-nao-body sm:mb-0 dark:text-neutral-300">
            <p className="[overflow-wrap:anywhere]">{email}</p>
            <p>{roleLabel} · Progresso salvo neste dispositivo</p>
          </div>
          <SignOutButton />
        </div>
      </motion.details>
    </div>
  );
}
