import { Download, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { canModerate, FORUM_CATEGORIES, isForumId } from "@/lib/forum-rules";
import { getForumTopic } from "@/lib/forum-store";
import { moderateReply, moderateTopic, updateLike } from "../actions";
import { ForumActionButton, ReplyForm } from "../ForumForms";
import { ForumBackLink, ForumDate, ForumPagination, ForumShell, ForumText, panelClass, secondaryClass, TopicMetrics } from "../ForumUi";
import { getForumPage } from "../query";

export const metadata = { title: "Publicação no fórum | Manual do NAO" };

function formatFileSize(size) {
  if (size < 1024) return `${size} B`;
  const unit = size < 1024 ** 2 ? "KB" : "MB";
  const value = size / (unit === "KB" ? 1024 : 1024 ** 2);
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${unit}`;
}

export default async function ForumTopicPage({ params, searchParams }) {
  const { id } = await params;
  if (!isForumId(id)) notFound();
  const user = await requireUser(`/forum/${id}`);
  const moderator = canModerate(user.role);
  const page = getForumPage((await searchParams).pagina);
  const topic = await getForumTopic(id, user.id, moderator, page);
  if (!topic) notFound();

  return (
    <ForumShell narrow>
      <ForumBackLink />
      <article className={`${panelClass} space-y-5 p-5 sm:p-8`}>
        <header className="space-y-2.5">
          <p className="text-sm font-bold text-sky-800 dark:text-sky-300">{FORUM_CATEGORIES[topic.category]}</p>
          <h1 className="break-words text-3xl font-black tracking-tight text-neutral-950 dark:text-white">{topic.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="break-words font-bold">{topic.author_name}</span>
            <ForumDate value={topic.created_at} />
            {topic.hidden_at && <span className="font-bold text-amber-800 dark:text-amber-300">Ocultada</span>}
            {topic.closed_at && <span className="font-bold">Encerrada</span>}
          </div>
        </header>
        <ForumText>{topic.body}</ForumText>

        {topic.attachments.length > 0 && (
          <section aria-labelledby="attachments-title" className="space-y-2 rounded-xl bg-sky-50 p-4 dark:bg-sky-950/70">
            <h2 id="attachments-title" className="font-extrabold text-neutral-900 dark:text-white">Anexos</h2>
            <ul className="space-y-1">
              {topic.attachments.map((file) => (
                <li key={file.id}>
                  <a href={`/forum/${id}/arquivos/${file.id}`} download className="flex items-start gap-2 rounded-lg p-2 hover:bg-sky-100 dark:hover:bg-sky-900">
                    <Download size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-700 dark:text-sky-300" />
                    <span className="min-w-0 flex-1 break-words font-bold text-sky-900 dark:text-sky-200">{file.filename}</span>
                    <span className="shrink-0 text-sm text-neutral-700 dark:text-neutral-300">{formatFileSize(file.size_bytes)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-700">
          <TopicMetrics topic={topic} />
          {!topic.hidden_at && <form action={updateLike.bind(null, id, !topic.liked)}>
            <ForumActionButton className={secondaryClass} pressed={topic.liked}><Heart size={17} aria-hidden="true" fill={topic.liked ? "currentColor" : "none"} /> {topic.liked ? "Descurtir" : "Curtir"}</ForumActionButton>
          </form>}
        </div>
        {moderator && (
          <div className="flex flex-wrap gap-2" aria-label="Moderação da publicação" role="group">
            <form action={moderateTopic.bind(null, id, topic.closed_at ? "reopen" : "close")}>
              <ForumActionButton className={secondaryClass}>{topic.closed_at ? "Reabrir discussão" : "Encerrar discussão"}</ForumActionButton>
            </form>
            <form action={moderateTopic.bind(null, id, topic.hidden_at ? "restore" : "hide")}>
              <ForumActionButton className={secondaryClass}>{topic.hidden_at ? "Restaurar publicação" : "Ocultar publicação"}</ForumActionButton>
            </form>
          </div>
        )}
      </article>

      <section id="respostas" aria-labelledby="reply-title" className="scroll-mt-20 space-y-3">
        <h2 id="reply-title" className="text-xl font-extrabold text-neutral-900 dark:text-white">Respostas</h2>
        <div className={`${panelClass} p-5 sm:p-6`}>
          {topic.hidden_at || topic.closed_at ? <p className="text-neutral-700 dark:text-neutral-300">Esta publicação está fechada para novas respostas.</p> : <ReplyForm topicId={id} page={page} />}
        </div>
        {topic.replies.length === 0 && <p className="text-sm text-neutral-700 dark:text-neutral-300">{page === 1 ? "Nenhuma resposta ainda." : "Nenhuma resposta nesta página."}</p>}
        <ul className="space-y-3">
          {topic.replies.map((reply) => (
            <li key={reply.id}>
              <article className={`${panelClass} space-y-2.5 p-4 sm:p-5`}>
                <header className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="break-words font-extrabold text-neutral-900 dark:text-white">{reply.author_name}</span>
                  <ForumDate value={reply.created_at} />
                  {reply.hidden_at && <span className="font-bold text-amber-800 dark:text-amber-300">Ocultada</span>}
                </header>
                <ForumText>{reply.body}</ForumText>
                {moderator && <form action={moderateReply.bind(null, id, reply.id, !reply.hidden_at)}>
                  <ForumActionButton className={secondaryClass}>{reply.hidden_at ? "Restaurar resposta" : "Ocultar resposta"}</ForumActionButton>
                </form>}
              </article>
            </li>
          ))}
        </ul>
        <ForumPagination page={page} hasMore={topic.hasMoreReplies} href={(replyPage) => `/forum/${id}${replyPage > 1 ? `?pagina=${replyPage}` : ""}#respostas`} />
      </section>
    </ForumShell>
  );
}
