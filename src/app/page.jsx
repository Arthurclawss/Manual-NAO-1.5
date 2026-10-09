"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useAppShell } from "@/components/AppShell";
import BlueprintBackground from "@/components/BlueprintBackground";

export default function Home() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useAppShell();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background from the blueprint aesthetic */}
      <BlueprintBackground />

      {/* Navbar */}
      <header className="absolute top-0 inset-x-0 z-50 p-6 flex items-center justify-between pointer-events-none">
        <div 
          className="flex items-center gap-3 pointer-events-auto cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden border border-neutral-200">
            <Image src="/nao.png" alt="NAO" width={40} height={40} className="object-contain scale-[1.3] translate-y-1" />
          </div>
          <span className="font-bold text-lg text-neutral-900 dark:text-white">
            Manual do NAO
          </span>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="pointer-events-auto flex items-center bg-[#202020] rounded-full p-1 border border-neutral-700/50 shadow-inner"
          aria-label="Alternar tema"
        >
          <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${!darkMode ? "bg-white text-black" : "text-neutral-400 hover:text-white"}`}>
            <Moon size={14} className={!darkMode ? "fill-current" : ""} />
          </div>
          <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${darkMode ? "bg-white text-black" : "text-neutral-400 hover:text-white"}`}>
            <Sun size={14} className={darkMode ? "fill-current" : ""} />
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full px-4 flex justify-center" id="conteudo-principal">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-[400px] bg-white dark:bg-neutral-900 rounded-[2rem] p-8 pt-16 shadow-2xl shadow-neutral-300/50 dark:shadow-none"
        >
          {/* NAO Head popping out */}
          <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-[140px] h-[140px] z-10 rounded-full border-[6px] border-white dark:border-neutral-900 shadow-xl overflow-hidden bg-white dark:bg-neutral-800">
            <Image 
              src="/nao-head-gray.jpg" 
              alt="NAO Head" 
              fill 
              className="object-cover object-center scale-[1.15]" 
            />
          </div>

          <div className="text-center space-y-2 mb-8 mt-2 relative z-0">
            <h1 className="text-[26px] font-bold text-neutral-900 dark:text-white tracking-tight">
              Bem-vindo de volta,
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm px-4">
              Acesse sua trilha de aprendizado do Robô NAO.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2e8a5b] hover:bg-[#25734c] text-white font-medium transition-colors shadow-sm"
            >
              <LogIn size={18} />
              Entrar
            </button>
            <button
              onClick={() => router.push("/projeto")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#2e8a5b] text-[#2e8a5b] font-medium hover:bg-[#2e8a5b]/5 transition-colors"
            >
              Conheça o nosso projeto
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
