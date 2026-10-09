"use client";

import React from "react";
import { useAppShell } from "@/components/AppShell";

const LINE = "#3b82c4";

/**
 * Linhas de medição (sem números), desenhadas no mesmo sistema de coordenadas
 * da imagem do NAO (1024x1024) para sempre acompanharem o robô.
 */
function MeasurementLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1024 1024"
      fill="none"
      stroke={LINE}
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <g opacity="0.55">
        {/* Altura total */}
        <path d="M232 34 V992" />
        <path d="M212 34 H252 M212 992 H252" />
        <path d="M232 34 l-9 20 h18 z M232 992 l-9 -20 h18 z" fill={LINE} />

        {/* Altura do tronco à base */}
        <path d="M168 200 V992" />
        <path d="M150 200 H186 M150 992 H186" />
        <path d="M168 200 l-8 18 h16 z M168 992 l-8 -18 h16 z" fill={LINE} />

        {/* Largura (ombro a ombro), acima do NAO */}
        <path d="M298 14 H765" />
        <path d="M298 2 V26 M765 2 V26" />
        <path d="M298 14 l18 -8 v16 z M765 14 l-18 -8 v16 z" fill={LINE} />
      </g>
    </svg>
  );
}

/** Senoide estilo osciloscópio, num espaço mais vazio do fundo. */
function SineWave() {
  return (
    <svg
      className="hidden lg:block absolute left-[38vw] top-[24vh] w-[26vw] max-w-[420px]"
      viewBox="0 0 400 100"
      fill="none"
      stroke={LINE}
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Eixo e marcas */}
      <path d="M0 50 H400" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
      <path
        d="M0 44 V56 M100 44 V56 M200 44 V56 M300 44 V56 M400 44 V56"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* Onda */}
      <path
        d="M0 50 C 25 -2, 75 -2, 100 50 S 175 102, 200 50 S 275 -2, 300 50 S 375 102, 400 50"
        strokeWidth="2.5"
        opacity="0.55"
      />
    </svg>
  );
}

export default function BlueprintBackground() {
  const { darkMode } = useAppShell();

  if (darkMode) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#030712] bg-grid-pattern-dark transition-colors duration-500"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full filter blur-3xl bg-sky-500 opacity-15" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full filter blur-3xl bg-orange-500 opacity-10" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-blueprint-gradient"
    >
      {/* Grade milimetrada */}
      <div className="absolute inset-0 bg-blueprint-grid" />

      {/* Senoide */}
      <SineWave />

      {/* NAO esmaecido à esquerda (só telas grandes) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/blueprint/nao-blueprint.jpg"
        alt=""
        className="hidden lg:block absolute left-[-3%] top-[10vh] h-[72vh] w-auto mix-blend-multiply opacity-[0.22] -scale-x-100 select-none"
        draggable={false}
      />

      {/* NAO principal à direita, com as linhas de medição presas ao robô */}
      <div className="absolute right-[-18%] sm:right-[2%] bottom-[-6vh] h-[88vh] aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blueprint/nao-blueprint.jpg"
          alt=""
          className="h-full w-full mix-blend-multiply opacity-[0.28] sm:opacity-[0.5] select-none"
          draggable={false}
        />
        <div className="hidden sm:block">
          <MeasurementLines />
        </div>
      </div>

      {/* Véu suave para manter o conteúdo legível */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
    </div>
  );
}
