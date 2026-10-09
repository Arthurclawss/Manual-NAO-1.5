"use client";

import React from "react";
import { useAppShell } from "@/components/AppShell";

export default function DeepBackground() {
  const { darkMode } = useAppShell();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-[#030712] bg-grid-pattern-dark" : "bg-nao-bg bg-grid-pattern"
      }`}
    >
      {/* Blob azul - topo direito */}
      <div
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full filter blur-3xl ${
          darkMode ? "bg-sky-500 opacity-15" : "bg-sky-200 mix-blend-multiply opacity-30"
        }`}
      />

      {/* Blob laranja - fundo esquerdo */}
      <div
        className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full filter blur-3xl ${
          darkMode ? "bg-orange-500 opacity-10" : "bg-orange-200 mix-blend-multiply opacity-30"
        }`}
      />
    </div>
  );
}
