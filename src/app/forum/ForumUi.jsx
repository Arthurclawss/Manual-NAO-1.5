import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, MessageSquare, Paperclip } from "lucide-react";
import BlueprintBackground from "@/components/BlueprintBackground";
import PageEntrance from "@/components/PageEntrance";

export const panelClass = "rounded-2xl border border-slate-300/85 bg-white shadow-md shadow-slate-900/[0.05] dark:border-neutral-700 dark:bg-neutral-900";
export const fieldClass = "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white";
export const primaryClass = "inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-800 disabled:opacity-60 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300";
export const secondaryClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-800";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Sao_Paulo" });

export function ForumShell({ children, narrow = false }) {
  return (
    <main id="conteudo-principal" className="relative min-h-screen px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <BlueprintBackground />
      <PageEntrance className={`relative mx-auto w-full space-y-5 ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        {children}
      </PageEntrance>
    </main>
  );
}

export function ForumBackLink() {
  return <Link href="/forum" className="inline-flex items-center gap-2 text-sm font-bold text-sky-800 hover:underline dark:text-sky-300"><ArrowLeft size={17} aria-hidden="true" /> Fórum</Link>;
}

export function ForumDate({ value }) {
  const date = new Date(Number(value));
  return <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>;
}

export function TopicMetrics({ topic }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300" aria-label="Atividade da publicação">
      <li className="inline-flex items-center gap-1.5"><MessageSquare size={15} aria-hidden="true" />{topic.reply_count} {Number(topic.reply_count) === 1 ? "resposta" : "respostas"}</li>
      <li className="inline-flex items-center gap-1.5"><Heart size={15} aria-hidden="true" />{topic.like_count} {Number(topic.like_count) === 1 ? "curtida" : "curtidas"}</li>
      {Number(topic.attachment_count) > 0 && <li className="inline-flex items-center gap-1.5"><Paperclip size={15} aria-hidden="true" />{topic.attachment_count} {Number(topic.attachment_count) === 1 ? "anexo" : "anexos"}</li>}
    </ul>
  );
}

export function ForumPagination({ page, hasMore, href }) {
  if (page === 1 && !hasMore) return null;

  return (
    <nav aria-label="Paginação" className="flex flex-wrap items-center justify-between gap-3">
      {page > 1 ? <Link className={secondaryClass} href={href(page - 1)}><ChevronLeft size={17} aria-hidden="true" /> Anterior</Link> : <span />}
      <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Página {page}</span>
      {hasMore ? <Link className={secondaryClass} href={href(page + 1)}>Próxima <ChevronRight size={17} aria-hidden="true" /></Link> : <span />}
    </nav>
  );
}

export function ForumText({ children }) {
  const parts = children.split(/(https?:\/\/[^\s<>"']+)/gi);

  return (
    <p className="whitespace-pre-wrap break-words text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
      {parts.map((part, index) => {
        if (index % 2 === 0) return part;
        const url = part.replace(/[.,!?;:)\]]+$/, "");
        if (!URL.canParse(url)) return part;
        return <Fragment key={index}><a href={url} target="_blank" rel="noreferrer" className="text-sky-800 underline underline-offset-2 dark:text-sky-300">{url}</a>{part.slice(url.length)}</Fragment>;
      })}
    </p>
  );
}
