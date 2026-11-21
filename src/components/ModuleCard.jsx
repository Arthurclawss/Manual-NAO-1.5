"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, ArrowRight, Sparkles } from "lucide-react";

const MotionLink = motion.create(Link);

export default function ModuleCard({
  id = "01",
  title = "Título do Módulo",
  summary = "Descrição detalhada do módulo.",
  icon,
  progress = 0,
  isLocked = false,
  prerequisiteId,
  href,
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Card = isLocked ? motion.div : MotionLink;

  // Glow dinâmico rastreando o mouse
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Card
      ref={cardRef}
      href={isLocked ? undefined : href}
      aria-label={isLocked ? undefined : `Abrir ${title}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isLocked ? undefined : { y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative block w-full min-h-44 md:min-h-[280px] rounded-2xl overflow-hidden ${
        isLocked
          ? "bg-slate-100 text-slate-600 border border-slate-300/90 shadow-sm dark:bg-neutral-900/75 dark:text-neutral-400 dark:border-neutral-700/70"
          : "bg-nao-card border border-slate-300/85 shadow-soft hover:shadow-float cursor-pointer dark:bg-neutral-900 dark:border-neutral-700/60"
      }`}
    >
      {/* Glow suave que segue o mouse */}
      {!isLocked && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.10), transparent 40%)`,
          }}
        />
      )}

      {/* Barra de progresso */}
      {!isLocked && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-neutral-800 z-20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-r-full bg-gradient-to-r from-sky-400 to-sky-500"
          />
        </div>
      )}

      {/* Watermark */}
      <div className="absolute -bottom-4 -right-2 z-0 pointer-events-none select-none">
        <span className="text-[10rem] font-black leading-none tracking-tighter text-sky-500/[0.06] dark:text-white/[0.02]">
          {id}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 p-4 md:p-8 h-full flex flex-col">
        {/* Ícone / XP com efeito pop no hover */}
        <div className="flex justify-between items-start">
          <motion.div
            animate={{ scale: isHovered && !isLocked ? [1, 1.2, 1] : 1 }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl font-black ${
              isLocked
                ? "bg-slate-200/90 dark:bg-neutral-800/70 text-slate-600 dark:text-neutral-400"
                : "bg-amber-50 text-amber-600 border border-amber-300/80 dark:bg-amber-400/10 dark:text-nao-xp dark:border-amber-400/20"
            }`}
          >
            {icon || <Sparkles size={24} />}
          </motion.div>
        </div>

        {/* Parte inferior */}
        <motion.div layout className="mt-auto flex flex-col justify-end pt-3 md:pt-12">
          <span
            className={`text-[10px] font-extrabold tracking-widest uppercase mb-2 ${
              isLocked ? "text-slate-600 dark:text-neutral-400" : "text-sky-600 dark:text-nao-primary"
            }`}
          >
            Módulo {id}
          </span>
          <motion.h3
            layout
            className={`text-lg md:text-2xl font-extrabold tracking-tight leading-tight ${
              isLocked ? "text-slate-700 dark:text-neutral-300" : "text-nao-title dark:text-white"
            }`}
          >
            {title}
          </motion.h3>

          {!isLocked && (
            <span className="mt-2 text-xs font-bold text-sky-700 md:hidden dark:text-sky-300">{progress}% concluído · Acessar</span>
          )}

          {/* Estado reveal (hover) */}
          <AnimatePresence>
            {isHovered && !isLocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hidden overflow-hidden md:block"
              >
                <p className="mt-4 text-sm text-nao-body dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {progress}% concluído
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-white bg-nao-secondary px-4 py-2.5 rounded-full shadow-md">
                    <span>Acessar</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Estado bloqueado */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <div className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-white/80 dark:bg-neutral-800 shadow-sm flex items-center justify-center text-sky-300">
                <Cloud size={26} />
              </div>
              <span className="text-sm font-medium text-slate-500 bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full">
                {`Conclua a trilha até o Módulo ${prerequisiteId}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
