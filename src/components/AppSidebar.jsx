"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  BookOpen,
  ChevronLeft,
  Menu,
  MessageCircle,
  Moon,
  Play,
  Shield,
  Sun,
  Trophy,
  User,
} from "lucide-react";
import { getCurrentModule, isModuleCompleted } from "@/data/moduleContent";
import { useModules } from "@/components/useModules";
import { calculateProfileProgress } from "@/data/profileData";
import UserAvatar from "@/components/UserAvatar";
import NaoLogo from "@/components/NaoLogo";

export default function AppSidebar({
  viewerName,
  isAdmin,
  isSidebarOpen,
  setIsSidebarOpen,
  darkMode,
  toggleDarkMode,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const modules = useModules();
  const currentModule = getCurrentModule(modules);
  const missionLabel = isModuleCompleted(currentModule) ? "Revisar módulo" : "Continuar missão";
  const profileProgress = useMemo(() => calculateProfileProgress(modules), [modules]);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Trophy,
      active: pathname === "/dashboard",
    },
    {
      label: "Capítulos",
      href: "/capitulos",
      icon: BookOpen,
      active: pathname === "/capitulos" || pathname.startsWith("/modulo"),
    },
    {
      label: "Conquistas",
      href: "/conquistas",
      icon: Award,
      active: pathname === "/conquistas",
    },
    {
      label: "Fórum",
      href: "/forum",
      icon: MessageCircle,
      active: pathname === "/forum" || pathname.startsWith("/forum/"),
    },
  ];

  if (isAdmin) navItems.push({
    label: "Administração",
    href: "/admin",
    icon: Shield,
    active: pathname === "/admin" || pathname.startsWith("/admin/"),
  });

  return (
    <>
      {/* Sidebar (Desktop - Left) */}
      <aside
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-white/80 dark:bg-neutral-900 backdrop-blur-xl dark:backdrop-blur-none border-r border-neutral-200/50 dark:border-neutral-700/50 shadow-sm transition-all duration-300 ${
          isSidebarOpen ? "w-64 lg:w-72" : "w-20"
        }`}
      >
        {/* Top: Brand & Collapse toggle */}
        <div
          className={`p-4 h-16 sm:h-20 flex items-center ${
            isSidebarOpen ? "justify-between" : "justify-center"
          } border-b border-neutral-200/50 dark:border-neutral-700/50 shrink-0`}
        >
          {isSidebarOpen && (
            <div
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 cursor-pointer shrink-0 overflow-hidden"
            >
              <NaoLogo size="md" />
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white truncate">
                Manual do NAO
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Recolher barra lateral" : "Expandir barra lateral"}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors shrink-0 flex items-center justify-center"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Middle: Profile & Main Navigation */}
        <div
          className={`flex-1 flex flex-col gap-6 p-4 ${
            isSidebarOpen ? "sm:p-6" : "items-center"
          } overflow-y-auto`}
        >
          <Link
            href={viewerName ? "/perfil" : "/login"}
            aria-label={viewerName ? "Meu perfil" : "Entrar"}
            className={`flex items-center ${
              isSidebarOpen ? "gap-3 p-3" : "justify-center p-2 w-full"
            } rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 cursor-pointer transition-colors border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600`}
          >
            <UserAvatar size="sm" />
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-neutral-900 dark:text-white leading-none truncate">
                  {viewerName || "Entrar"}
                </span>
                {viewerName && <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-1">Nível {profileProgress.level}</span>}
              </div>
            )}
          </Link>

          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-700 shrink-0" />

          <nav className="flex flex-col gap-2 w-full" aria-label="Navegação principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => router.push(item.href)}
                  className={`flex items-center ${
                    isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"
                  } py-3 rounded-xl font-bold transition-colors w-full ${
                    item.active
                      ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                  title={item.label}
                >
                  <Icon size={18} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom-left: Mission & Theme */}
        <div
          className={`p-4 ${
            isSidebarOpen ? "sm:p-6" : ""
          } border-t border-neutral-200/50 dark:border-neutral-700/50 flex flex-col gap-3 shrink-0`}
        >
          <button
            type="button"
            onClick={() => router.push(currentModule.route)}
            className={`flex items-center justify-center ${
              isSidebarOpen ? "gap-2 px-4" : "px-0"
            } py-3 rounded-full bg-nao-secondary hover:bg-orange-600 text-white font-bold transition-colors shadow-md w-full`}
            title={missionLabel}
          >
            <Play size={16} fill="currentColor" />
            {isSidebarOpen && <span>{missionLabel}</span>}
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className={`flex items-center justify-center ${
              isSidebarOpen ? "gap-2 px-4" : "px-0"
            } py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold transition-colors w-full`}
            title="Alternar Tema"
          >
            {darkMode ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-neutral-600" />
            )}
            {isSidebarOpen && <span>{darkMode ? "Modo Claro" : "Modo Escuro"}</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 backdrop-blur-xl dark:backdrop-blur-none bg-white/80 dark:bg-neutral-900 border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-sm h-16 flex items-center justify-between px-4 shrink-0">
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <NaoLogo size="sm" />
          <span className="font-extrabold text-lg text-neutral-900 dark:text-white">
            Manual do NAO
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && <Link href="/admin" aria-label="Administração" className="rounded-lg bg-neutral-100 p-2 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"><Shield size={18} aria-hidden="true" /></Link>}
          <Link href="/forum" aria-label="Fórum" className="rounded-lg bg-neutral-100 p-2 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            <MessageCircle size={18} aria-hidden="true" />
          </Link>
          <Link href={viewerName ? "/perfil" : "/login"} aria-label={viewerName ? "Meu perfil" : "Entrar"} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            <User size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Alternar tema"
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </div>
      </header>
    </>
  );
}
