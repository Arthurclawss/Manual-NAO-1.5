"use client";

import { useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  BookOpen,
  ChevronLeft,
  House,
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
  textScale = 0,
  onChangeTextScale,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const mobileMenu = useRef(null);

  const modules = useModules();
  const currentModule = getCurrentModule(modules);
  const missionLabel = isModuleCompleted(currentModule) ? "Revisar módulo" : "Continuar missão";
  const profileProgress = useMemo(() => calculateProfileProgress(modules), [modules]);
  const dashboard = { label: "Dashboard", href: "/dashboard", icon: Trophy, active: pathname === "/dashboard" };

  const navItems = [
    dashboard,
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
            <Link
              href={dashboard.href}
              className="flex min-w-0 items-center gap-3 overflow-hidden"
            >
              <span className="shrink-0"><NaoLogo size="md" /></span>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white truncate">
                Manual do NAO
              </span>
            </Link>
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
              const Icon = item === dashboard ? House : item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center ${
                    isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"
                  } py-3 rounded-xl font-bold transition-colors w-full ${
                    item.active
                      ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
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
            aria-label={missionLabel}
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
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
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
      <header className="md:hidden sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-1.5 border-b border-neutral-200/50 bg-white/90 px-2.5 shadow-sm backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900 dark:backdrop-blur-none">
        <div className="flex min-w-8 flex-1 items-center gap-2 overflow-hidden">
          <span className="shrink-0"><NaoLogo size="sm" /></span>
          <span className="hidden truncate font-extrabold text-neutral-900 min-[480px]:inline dark:text-white">
            Manual do NAO
          </span>
        </div>
        {onChangeTextScale && (
          <div
            className="inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-neutral-100/90 p-0.5 dark:border-neutral-700 dark:bg-neutral-800"
            role="group"
            aria-label="Tamanho da fonte"
          >
            <button
              type="button"
              onClick={() => onChangeTextScale(textScale + 1)}
              disabled={textScale >= 3}
              aria-label="Aumentar tamanho da fonte"
              className="px-2 py-1.5 rounded-lg text-[12px] leading-none font-black text-neutral-800 dark:text-white hover:bg-white dark:hover:bg-neutral-700 disabled:opacity-40"
            >
              A+
            </button>
            <span className="h-3.5 w-px bg-slate-300 dark:bg-neutral-600" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onChangeTextScale(textScale - 1)}
              disabled={textScale <= 0}
              aria-label="Diminuir tamanho da fonte"
              className="px-2 py-1.5 rounded-lg text-[12px] leading-none font-black text-neutral-800 dark:text-white hover:bg-white dark:hover:bg-neutral-700 disabled:opacity-40"
            >
              A-
            </button>
          </div>
        )}
        <Link
          href={dashboard.href}
          aria-current={dashboard.active ? "page" : undefined}
          className={`inline-flex h-10 shrink-0 items-center gap-1 rounded-xl px-2 text-[13px] font-bold whitespace-nowrap transition-colors ${dashboard.active ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300" : "text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"}`}
        >
          <House size={16} aria-hidden="true" /> {dashboard.label}
        </Link>
        <button
          type="button"
          popoverTarget="mobile-site-menu"
          className="inline-flex h-10 shrink-0 items-center gap-1 rounded-xl bg-neutral-100 px-2.5 text-[13px] font-bold whitespace-nowrap text-neutral-800 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          <Menu size={16} aria-hidden="true" /> Menu
        </button>

        <div
          id="mobile-site-menu"
          ref={mobileMenu}
          popover="auto"
          className="mobile-site-menu fixed inset-auto top-14 right-3 m-0 max-h-[calc(100dvh-4.25rem)] w-64 max-w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-2 text-neutral-800 shadow-xl md:hidden dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        >
          <nav aria-label="Navegação principal" className="flex flex-col">
            {[...navItems, { label: viewerName ? "Meu perfil" : "Entrar", href: viewerName ? "/perfil" : "/login", icon: User, active: pathname === "/perfil" }].map(({ label, href, icon: Icon, active }) => (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onNavigate={() => mobileMenu.current?.hidePopover()}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition-colors ${active ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
              >
                <Icon size={18} aria-hidden="true" /> {label}
              </Link>
            ))}
          </nav>
          <button type="button" onClick={toggleDarkMode} className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
            {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            {darkMode ? "Modo claro" : "Modo escuro"}
          </button>
        </div>
      </header>
    </>
  );
}
