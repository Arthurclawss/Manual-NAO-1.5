"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Bot, CheckCircle2, FileDown, RotateCcw } from "lucide-react";
import { getModulePrerequisite, isModuleCompleted, loadModules, saveModules } from "@/data/moduleContent";
import { lessons } from "@/data/lessons";
import { moduleQuizzes, QUIZ_PASS_SCORE, scoreQuiz } from "@/data/moduleQuizzes";
import { LessonActivity, LessonHeader, LessonIndex } from "@/components/LessonStudy";
import ModuleQuiz from "@/components/ModuleQuiz";
import { useModules } from "@/components/useModules";
import { useAppShell } from "@/components/AppShell";
import { exportModuleToPdf } from "@/lib/modulePdf";

function renderText(body) {
  const blocks = body.split("\n\n").filter(Boolean);
  return blocks.map((block, idx) => {
    const lines = block.split("\n").filter(Boolean);
    const isList = lines.every((line) => line.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={idx} className="list-disc space-y-2 pl-6 leading-relaxed marker:text-sky-700 dark:marker:text-sky-300">
          {lines.map((line, li) => (
            <li key={li} className="pl-1 text-slate-700 dark:text-slate-200">{line.trim().slice(2)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="whitespace-pre-line break-words leading-[1.75] text-slate-700 dark:text-slate-200">
        {block}
      </p>
    );
  });
}

function renderContentBlock(block, index) {
  if (block.type === "image") {
    return (
      <figure key={`${block.type}-${index}`} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        {/* Dynamic administrator-provided URLs cannot be declared in Next image config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.url} alt={block.alt || block.caption || ""} className="w-full object-cover" />
        {block.caption && <figcaption className="p-3 text-sm text-center text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800">{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "video") {
    return (
      <div key={`${block.type}-${index}`} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <div className="aspect-video">
          <iframe src={block.url} title={block.title || "Vídeo do módulo"} allowFullScreen className="w-full h-full" />
        </div>
        {block.title && <strong className="block p-3 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800">{block.title}</strong>}
      </div>
    );
  }
  if (block.type === "link") {
    return (
      <a
        key={`${block.type}-${index}`}
        href={block.url}
        target="_blank"
        rel="noreferrer"
        className="block p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-400 transition-colors group"
      >
        <span className="text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline">{block.label || block.url}</span>
        {block.description && <small className="block text-xs text-neutral-500 dark:text-neutral-400 mt-1">{block.description}</small>}
      </a>
    );
  }
  return (
    <div key={`${block.type}-${index}`} className="space-y-3">
      {renderText(block.text || "")}
    </div>
  );
}

export default function CourseModule({ id }) {
  const router = useRouter();
  const { isAdmin } = useAppShell();
  const modules = useModules();
  const courseModule = modules.find((item) => item.id === id);
  const prerequisite = isAdmin ? null : getModulePrerequisite(modules, id);
  const nextModule = modules.find((item) => item.id > id);
  const isCompleted = isModuleCompleted(courseModule);
  const study = lessons[id];
  const quiz = moduleQuizzes[id];
  const sections = courseModule.sections.map((section, index) => ({ ...section, id: `leitura-${index + 1}` }));

  function updateModuleProgress(answers) {
    const score = answers === null ? null : scoreQuiz(quiz, answers);
    if (answers !== null && (score === null || score < QUIZ_PASS_SCORE)) return;
    const latestModules = loadModules();
    if (!isAdmin && getModulePrerequisite(latestModules, id)) return;

    const updated = latestModules.map((item) =>
      item.id === id ? { ...item, progress: score === null ? 0 : 100, quizScore: score } : item
    );
    saveModules(updated);
    if (score !== null) requestAnimationFrame(() => document.getElementById("completed-module")?.focus());
  }

  if (prerequisite) {
    return (
      <main id="conteudo-principal" className="mx-auto w-full max-w-4xl space-y-4 p-6 sm:py-12">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">{courseModule.tag} bloqueado</h1>
        <p className="text-neutral-700 dark:text-neutral-300">Conclua a trilha até o Módulo {id - 1} para liberar este conteúdo.</p>
        <Link href={prerequisite.route} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white">Abrir Módulo {prerequisite.id} <ArrowRight size={16} aria-hidden="true" /></Link>
      </main>
    );
  }

  return (
    <main id="conteudo-principal" className="bg-tech-grid min-h-screen bg-[#f1f6fb] dark:bg-[#091420]">
      <div className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
        <LessonHeader module={courseModule} total={modules.length} goal={study.goal} completed={isCompleted} firstSection={sections[0]?.id || "pratica"} />
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(225px,0.36fr)] lg:gap-6">
          <LessonIndex sections={[...sections, { id: "pratica", title: "Na prática" }, { id: "revisao", title: isCompleted ? "Módulo concluído" : "Quiz do módulo" }]} source={study.source} />
          <div className="min-w-0 space-y-5">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-20 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-7">
                <h2 id={`${section.id}-title`} className="break-words text-xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-2xl">{section.title}</h2>
                {section.blocks.map((block, index) => renderContentBlock(block, index))}
              </section>
            ))}
            <LessonActivity activity={study.activity} />
            {isCompleted ? (
              <section id="revisao" aria-labelledby="completed-module" className="scroll-mt-20 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-6 shadow-sm dark:border-emerald-700/50 dark:bg-emerald-950/30 sm:p-8">
                <div className="space-y-1">
                  <h2 id="completed-module" tabIndex={-1} className="flex items-center gap-2 text-xl font-bold text-neutral-900 focus:outline-none dark:text-white">
                    <CheckCircle2 size={20} className="shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                    {courseModule.tag} concluído!
                  </h2>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {Number.isInteger(courseModule.quizScore) && `Você acertou ${courseModule.quizScore} de ${quiz.length} perguntas. `}
                    {`Ganhou +${courseModule.xp} XP.`}
                    {nextModule && ` O Módulo ${nextModule.id} está liberado.`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {nextModule && <Link href={nextModule.route} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white">Próximo módulo <ArrowRight size={16} aria-hidden="true" /></Link>}
                    <button
                      type="button"
                      onClick={() => router.push("/perfil")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-colors"
                    >
                      <Bot size={16} />
                      Ver meu NAO
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/conquistas")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors"
                    >
                      <Award size={16} />
                      Conquistas
                    </button>
                    <button
                      type="button"
                      onClick={() => exportModuleToPdf(courseModule, study, quiz)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white font-bold text-sm transition-colors"
                    >
                      <FileDown size={16} />
                      Baixar conteúdo em PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => updateModuleProgress(null)}
                      title="Reiniciar este módulo e bloquear os seguintes até concluí-lo novamente"
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-medium text-xs transition-colors"
                    >
                      <RotateCcw size={14} />
                      Refazer quiz
                    </button>
                </div>
              </section>
            ) : <ModuleQuiz key={id} quiz={quiz} onComplete={updateModuleProgress} />}
          </div>
        </div>
      </div>
    </main>
  );
}
