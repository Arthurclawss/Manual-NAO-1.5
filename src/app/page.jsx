"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppShell } from "@/components/AppShell";
import BlueprintBackground from "@/components/BlueprintBackground";
import NaoLogo from "@/components/NaoLogo";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import HomeShowcaseCarousel from "@/components/HomeShowcaseCarousel";

export default function Home() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useAppShell();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-x-hidden">
      {/* Background from the blueprint aesthetic */}
      <BlueprintBackground />

      {/* Navbar */}
      <header className="absolute top-0 inset-x-0 z-50 p-6 flex items-center justify-between pointer-events-none">
        <div
          className="flex items-center gap-3 pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <NaoLogo size="md" />
          <span className="font-bold text-lg text-neutral-900 dark:text-white">
            Manual do NAO
          </span>
        </div>

        <button
          onClick={toggleDarkMode}
          className="pointer-events-auto flex items-center bg-[#202020] rounded-full p-1 border border-neutral-700/50 shadow-inner cursor-pointer"
          aria-label="Alternar tema"
        >
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
              !darkMode ? "bg-white text-black" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Moon size={14} className={!darkMode ? "fill-current" : ""} />
          </div>
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
              darkMode ? "bg-white text-black" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sun size={14} className={darkMode ? "fill-current" : ""} />
          </div>
        </button>
      </header>

      {/* Main Content: Carrossel à esquerda + Login à direita */}
      <main
        id="conteudo-principal"
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-8 lg:gap-12">
          {/* Esquerda: Carrossel explicativo */}
          <div className="order-2 lg:order-1">
            <HomeShowcaseCarousel />
          </div>

          {/* Direita: Card de entrada/login */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end pt-10 lg:pt-0">
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-[400px] bg-white dark:bg-neutral-900 border border-slate-300/85 dark:border-neutral-700/60 rounded-[2rem] p-8 pt-16 shadow-2xl shadow-slate-900/10 dark:shadow-none"
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
                <SplitText
                  text="Bem-vindo de volta,"
                  tag="h1"
                  delay={40}
                  className="justify-center text-[26px] font-bold text-neutral-900 dark:text-white tracking-tight"
                />
                <BlurText
                  text="Acesse sua trilha de aprendizado do Robô NAO."
                  tag="p"
                  delay={45}
                  className="justify-center text-slate-600 dark:text-neutral-400 text-sm px-4"
                />
              </div>

              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2e8a5b] hover:bg-[#25734c] text-white font-medium transition-colors shadow-sm"
                >
                  <LogIn size={18} />
                  Entrar
                </Link>
                <button
                  type="button"
                  onClick={() => router.push("/projeto")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#2e8a5b] text-[#2e8a5b] font-medium hover:bg-[#2e8a5b]/5 transition-colors cursor-pointer"
                >
                  Conheça o nosso projeto
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
