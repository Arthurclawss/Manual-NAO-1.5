"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // 1. Grid 3D - Ilusão de voar por uma superfície ao scroll
  const gridZ = useTransform(scrollY, [0, 1000], [0, 300]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 150]);

  // 2. Parallax de Massas Coloridas (Blobs)
  const farBlobY = useTransform(scrollY, [0, 1000], [0, -50]); // Longe (lento)
  const midBlobY = useTransform(scrollY, [0, 1000], [0, -150]); // Médio
  const closeBlobY = useTransform(scrollY, [0, 1000], [0, -350]); // Perto (rápido)

  // 3. Parallax de Partículas de Luz
  const particleSlow = useTransform(scrollY, [0, 1000], [0, -40]);
  const particleMed = useTransform(scrollY, [0, 1000], [0, -120]);
  const particleFast = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-500"
      style={{ perspective: "1000px" }}
    >
      {/* ==================== CAMADA 1: PROFUNDIDADE DO GRID 3D ==================== */}
      <motion.div 
        style={{ 
          y: gridY,
          translateZ: gridZ,
          rotateX: 60, // Inclinação 3D para o horizonte
        }}
        className="absolute bottom-[-60%] left-[-50%] w-[200%] h-[150%] opacity-10 dark:opacity-20 origin-bottom"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            // Máscara fade-out para o topo simulando o "horizonte" distante
            maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* ==================== CAMADA 2: BLOBS AMBIENTAIS (LONGE E DESFOCADOS) ==================== */}
      <motion.div
        style={{ y: farBlobY }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-emerald-300/30 dark:bg-emerald-700/20 blur-[120px] md:blur-[160px]"
      />

      <motion.div
        style={{ y: midBlobY }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 1.15, 0.85, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-cyan-300/30 dark:bg-cyan-800/30 blur-[100px] md:blur-[140px]"
      />

      {/* ==================== CAMADA 3: BLOBS FRONTAIS (PERTO E MAIS NÍTIDOS) ==================== */}
      <motion.div
        style={{ y: closeBlobY }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[70%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-400/25 dark:bg-emerald-400/15 blur-[70px] md:blur-[90px]"
      />

      <motion.div
        style={{ y: closeBlobY }}
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[80%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-cyan-400/25 dark:bg-cyan-400/15 blur-[60px] md:blur-[80px]"
      />

      {/* ==================== CAMADA 4: PARTÍCULAS / POEIRA ESTELAR (DEPTH OF FIELD) ==================== */}
      
      {/* Partículas Longe (Pequenas, Desfocadas, Lentas) */}
      <motion.div style={{ y: particleSlow }} className="absolute inset-0">
        <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-emerald-400/40 blur-[2px]" />
        <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-cyan-400/40 blur-[3px]" />
        <div className="absolute top-[80%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/30 blur-[2px]" />
      </motion.div>

      {/* Partículas Médias */}
      <motion.div style={{ y: particleMed }} className="absolute inset-0">
        <div className="absolute top-[10%] right-[40%] w-3 h-3 rounded-full bg-emerald-400/60 blur-[1px]" />
        <div className="absolute top-[40%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/60 blur-[1px]" />
        <div className="absolute top-[75%] right-[35%] w-2.5 h-2.5 rounded-full bg-white/50 blur-[1px]" />
      </motion.div>

      {/* Partículas Perto (Maiores, Nítidas, Rápidas) */}
      <motion.div style={{ y: particleFast }} className="absolute inset-0">
        <div className="absolute top-[15%] left-[60%] w-1.5 h-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <div className="absolute top-[50%] right-[10%] w-2 h-2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <div className="absolute top-[85%] left-[50%] w-2 h-2 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
      </motion.div>
    </div>
  );
}
