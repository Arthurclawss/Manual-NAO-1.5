"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, BookOpen, Check, FlaskConical, List, Target } from "lucide-react";

export function LessonHeader({ module, total, goal, completed, firstSection }) {
  return (
    <>
      <Link href="/dashboard" className="inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-slate-700 hover:text-sky-800 focus-visible:outline-2 dark:text-slate-300 dark:hover:text-sky-300"><ArrowLeft size={17} aria-hidden="true" /> Voltar à trilha</Link>
      <header className="isolate grid overflow-hidden rounded-3xl bg-[#0b213b] text-white shadow-[0_18px_50px_-26px_#075985] md:grid-cols-[minmax(0,1fr)_minmax(230px,0.52fr)]">
        <div className="flex min-w-0 flex-col items-start gap-4 bg-gradient-to-br from-[#102d4e] to-[#0b213b] p-6 sm:p-9 lg:p-12">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-sky-200">
            <span>Trilha NAO · {module.tag} de {total}</span>
            {completed && <span className="inline-flex items-center gap-1.5 text-emerald-200"><Check size={15} aria-hidden="true" /> Concluído</span>}
          </p>
          <h1 className="max-w-[20ch] break-words text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">{module.title}</h1>
          <p className="max-w-[54ch] whitespace-pre-line leading-relaxed text-slate-100">{module.intro}</p>
          <div className="flex max-w-[54ch] items-start gap-2.5 border-l-2 border-sky-400 pl-3 text-sm leading-relaxed text-sky-100">
            <Target size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p><strong className="block text-white">O que você vai aprender</strong>{goal}</p>
          </div>
          <a href={`#${firstSection}`} className="mt-1 inline-flex items-center gap-2 rounded-xl bg-sky-300 px-4 py-2.5 text-sm font-extrabold text-slate-950 hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">Ir para a leitura <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <div aria-hidden="true" className="relative hidden min-h-full items-center justify-center overflow-hidden bg-[#dbeefa] p-5 md:flex">
          <div className="absolute inset-0 bg-blueprint-grid" />
          <div className="absolute aspect-square w-[86%] rounded-full border border-sky-700/20 ring-[22px] ring-white/25" />
          <Image src="/nao-head-3d.png" alt="" width={360} height={360} sizes="(min-width: 1024px) 350px, 260px" className="relative h-auto w-full max-w-[360px] select-none object-contain mix-blend-multiply" />
        </div>
      </header>
    </>
  );
}

export function LessonIndex({ sections, source }) {
  const links = (
    <>
      <ul className="mt-2 space-y-0.5 text-sm">
        {sections.map(({ id, title }) => <li key={id}><a href={`#${id}`} className="block break-words rounded-lg px-2 py-1.5 font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sky-200">{title}</a></li>)}
      </ul>
      {source && <a href={source[1]} target="_blank" rel="noreferrer" className="mt-3 flex items-start gap-2 border-t border-slate-200 pt-3 text-sm font-bold text-sky-800 underline-offset-4 hover:underline dark:border-slate-700 dark:text-sky-300"><BookOpen size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {source[0]} <ArrowUpRight size={15} className="mt-0.5 shrink-0" aria-hidden="true" /></a>}
    </>
  );

  return (
    <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 lg:order-last lg:sticky lg:top-6 lg:self-start dark:border-slate-700 dark:bg-slate-900">
      <details className="lg:hidden">
        <summary className="cursor-pointer font-extrabold text-slate-950 dark:text-white">Nesta aula</summary>
        <nav aria-label="Nesta aula">{links}</nav>
      </details>
      <nav aria-labelledby="lesson-index" className="hidden lg:block">
        <h2 id="lesson-index" className="flex items-center gap-2 font-extrabold text-slate-950 dark:text-white"><List size={18} className="text-sky-700 dark:text-sky-300" aria-hidden="true" /> Nesta aula</h2>
        {links}
      </nav>
    </aside>
  );
}

export function LessonActivity({ activity }) {
  const [title, prompt, steps, example] = activity;
  return (
    <section id="pratica" aria-labelledby="lesson-activity" className="scroll-mt-20 space-y-4 rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-7 dark:border-sky-900 dark:bg-[#10283f]">
      <p className="flex items-center gap-2 text-sm font-extrabold text-sky-800 dark:text-sky-200"><FlaskConical size={19} aria-hidden="true" /> Na prática</p>
      <h2 id="lesson-activity" className="text-2xl font-extrabold text-slate-950 dark:text-white">{title}</h2>
      <p className="text-slate-700 dark:text-slate-200">{prompt}</p>
      <ol className="list-decimal space-y-2 pl-6 leading-relaxed text-slate-700 marker:font-extrabold marker:text-sky-800 dark:text-slate-200 dark:marker:text-sky-300">
        {steps.map((step) => <li key={step} className="pl-1">{step}</li>)}
      </ol>
      <details className="rounded-xl border border-sky-200 bg-white/80 p-3.5 dark:border-sky-800 dark:bg-slate-950/35">
        <summary className="cursor-pointer font-extrabold text-sky-800 dark:text-sky-200">Ver um exemplo</summary>
        <p className="mt-2 text-slate-700 dark:text-slate-200">{example}</p>
      </details>
    </section>
  );
}
