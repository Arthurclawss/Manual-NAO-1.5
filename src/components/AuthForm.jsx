"use client";

import { useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import BlueprintBackground from "@/components/BlueprintBackground";
import { useAppShell } from "@/components/AppShell";
import { authClient } from "@/lib/auth-client";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/lib/password-policy.mjs";

const inputClass = "w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-base text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:focus-visible:outline-sky-400";

export default function AuthForm({ registering = false, destination }) {
  const { darkMode, toggleDarkMode } = useAppShell();
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);
  const title = registering ? "Criar conta" : "Entrar";
  const alternative = registering ? "/login" : "/cadastro";
  const alternativeHref = destination === "/dashboard" ? alternative : `${alternative}?next=${encodeURIComponent(destination)}`;

  async function handleSubmit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const email = fields.get("email").trim();
    const password = fields.get("password");
    const name = registering ? fields.get("name").trim() : "";

    if (registering && name.length < 2) {
      setErrorMessage("Digite um nome com pelo menos 2 caracteres.");
      return;
    }

    setErrorMessage("");
    setPending(true);

    try {
      const { error } = registering
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (!error) {
        window.location.replace(destination);
        return;
      }

      if (error.status === 429) setErrorMessage("Muitas tentativas. Aguarde um momento e tente novamente.");
      else if (error.status >= 500) setErrorMessage("O serviço de acesso está indisponível. Tente novamente em instantes.");
      else if (registering) setErrorMessage("Não foi possível criar a conta. Confira os dados ou tente entrar se já tiver cadastro.");
      else setErrorMessage("E-mail ou senha incorretos.");
    } catch {
      setErrorMessage("Não foi possível conectar. Verifique sua conexão e tente novamente.");
    }

    setPending(false);
  }

  return (
    <main id="conteudo-principal" className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <BlueprintBackground />
      <section aria-labelledby="auth-title" className="relative w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-600 hover:text-sky-700 dark:text-neutral-300 dark:hover:text-sky-300">
            <ArrowLeft size={16} aria-hidden="true" /> Início
          </Link>
          <button type="button" onClick={toggleDarkMode} aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"} className="rounded-lg bg-neutral-100 p-2.5 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
            {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>
        <h1 id="auth-title" className="mb-6 text-3xl font-extrabold text-neutral-900 dark:text-white">{title}</h1>
        <form method="post" onSubmit={handleSubmit} className="space-y-4" aria-busy={pending}>
          {registering && (
            <div className="space-y-1.5">
              <label htmlFor="auth-name" className="block text-sm font-bold text-neutral-800 dark:text-neutral-100">Nome de exibição</label>
              <input className={inputClass} id="auth-name" name="name" type="text" autoComplete="nickname" required minLength={2} maxLength={80} />
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="block text-sm font-bold text-neutral-800 dark:text-neutral-100">E-mail</label>
            <input className={inputClass} id="auth-email" name="email" type="email" autoComplete="username" required maxLength={254} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="auth-password" className="block text-sm font-bold text-neutral-800 dark:text-neutral-100">Senha</label>
            <input className={inputClass} id="auth-password" name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} required minLength={registering ? MIN_PASSWORD_LENGTH : undefined} maxLength={MAX_PASSWORD_LENGTH} aria-describedby={registering ? "auth-password-help" : undefined} />
            {registering && <p id="auth-password-help" className="text-sm text-neutral-600 dark:text-neutral-400">Use pelo menos {MIN_PASSWORD_LENGTH} caracteres.</p>}
          </div>
          {errorMessage && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-900 dark:bg-red-950 dark:text-red-200">{errorMessage}</p>}
          <button type="submit" disabled={pending} className="w-full rounded-xl bg-[#237048] px-4 py-3 font-bold text-white hover:bg-[#1a5838] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-60">
            {pending ? (registering ? "Criando conta…" : "Entrando…") : title}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {registering ? "Já tem conta? " : "Primeiro acesso? "}
          <Link href={alternativeHref} className="font-bold text-sky-700 underline underline-offset-4 dark:text-sky-300">
            {registering ? "Entrar" : "Criar conta"}
          </Link>
        </p>
      </section>
    </main>
  );
}
