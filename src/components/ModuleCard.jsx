"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, ArrowRight, Sparkles } from "lucide-react";

export default function ModuleCard({
  id = "01",
  title = "Título do Módulo",
  summary = "Descrição detalhada do módulo.",
  icon,
  progress = 0,
  isLocked = false,
  unlockLevel,
  onClick,
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isLocked && onClick?.()}
      whileHover={isLocked ? undefined : { y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full min-h-[260px] sm:min-h-[280px] rounded-2xl overflow-hidden ${
        isLocked
          ? "bg-nao-locked-bg text-nao-locked-text opacity-80 border border-slate-200 dark:bg-neutral-900/40 dark:border-neutral-800"
          : "bg-nao-card border border-slate-100 shadow-soft hover:shadow-float cursor-pointer dark:bg-neutral-900 dark:border-neutral-700/50"
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
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
        {/* Ícone / XP com efeito pop no hover */}
        <div className="flex justify-between items-start">
          <motion.div
            animate={{ scale: isHovered && !isLocked ? [1, 1.2, 1] : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
              isLocked
                ? "bg-slate-200/70 dark:bg-neutral-800/50 text-nao-locked-text"
                : "bg-amber-50 text-amber-500 border border-amber-200 dark:bg-amber-400/10 dark:text-nao-xp dark:border-amber-400/20"
            }`}
          >
            {icon || <Sparkles size={24} />}
          </motion.div>
        </div>

        {/* Parte inferior */}
        <motion.div layout className="mt-auto flex flex-col justify-end pt-12">
          <span
            className={`text-[10px] font-extrabold tracking-widest uppercase mb-2 ${
              isLocked ? "text-nao-locked-text" : "text-nao-primary"
            }`}
          >
            Módulo {id}
          </span>
          <motion.h3
            layout
            className={`text-2xl font-extrabold tracking-tight leading-tight ${
              isLocked ? "text-slate-500" : "text-nao-title dark:text-white"
            }`}
          >
            {title}
          </motion.h3>

          {/* Estado reveal (hover) */}
          <AnimatePresence>
            {isHovered && !isLocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-sm text-nao-body dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {progress}% concluído
                  </span>
                  <button className="flex items-center gap-2 text-xs font-bold text-white bg-nao-secondary hover:bg-orange-600 px-4 py-2.5 rounded-full transition-colors shadow-md">
                    <span>Acessar</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Estado bloqueado */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/80 dark:bg-neutral-800 shadow-sm flex items-center justify-center text-sky-300">
                <Cloud size={26} />
              </div>
              <span className="text-sm font-medium text-slate-500 bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full">
                {unlockLevel ? `Desbloqueia no Nível ${unlockLevel}` : "Em breve"}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
