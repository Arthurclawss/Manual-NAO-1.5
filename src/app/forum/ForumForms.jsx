"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { FORUM_CATEGORIES, FILE_ACCEPT, getAttachmentError, REPLY_LIMIT, TOPIC_BODY_LIMIT, TOPIC_TITLE_LIMIT } from "@/lib/forum-rules";
import { publishReply, publishTopic } from "./actions";
import { fieldClass, primaryClass } from "./ForumUi";

function FormError({ message }) {
  if (!message) return null;
  return <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 dark:bg-red-950 dark:text-red-200">{message}</p>;
}

export function TopicForm() {
  const [state, action, pending] = useActionState(publishTopic, null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [fileError, setFileError] = useState("");

  function validateFiles(event) {
    const error = getAttachmentError(Array.from(event.currentTarget.files));
    event.currentTarget.setCustomValidity(error);
    setFileError(error);
  }

  return (
    <form action={action} className="space-y-5" aria-busy={pending}>
      <div className="space-y-1.5">
        <label htmlFor="topic-title" className="block text-sm font-bold">Título</label>
        <input id="topic-title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClass} required minLength={5} maxLength={TOPIC_TITLE_LIMIT} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="topic-category" className="block text-sm font-bold">Categoria</label>
        <select id="topic-category" name="category" value={category} onChange={(event) => setCategory(event.target.value)} className={fieldClass} required>
          <option value="">Selecione uma categoria</option>
          {Object.entries(FORUM_CATEGORIES).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="topic-body" className="block text-sm font-bold">Publicação</label>
        <textarea id="topic-body" name="body" value={body} onChange={(event) => setBody(event.target.value)} rows={7} minLength={10} maxLength={TOPIC_BODY_LIMIT} required className={fieldClass} />
      </div>
      <div className="space-y-2 rounded-xl border border-dashed border-neutral-300 p-4 dark:border-neutral-600">
        <label htmlFor="topic-files" className="block text-sm font-bold">Anexos <span className="font-normal text-neutral-600 dark:text-neutral-300">(opcional)</span></label>
        <p id="files-help" className="text-sm text-neutral-700 dark:text-neutral-300">Até 3 arquivos, com 3 MB por arquivo e 4 MB no total. Aceita projetos do Choregraphe, código, documentos, imagens e arquivos compactados.</p>
        <input id="topic-files" name="files" type="file" multiple accept={FILE_ACCEPT} onChange={validateFiles} aria-describedby="files-help" className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-sky-100 file:px-3 file:py-2 file:font-bold file:text-sky-900 dark:file:bg-sky-950 dark:file:text-sky-200" />
      </div>
      <FormError message={fileError || state?.error} />
      <button type="submit" disabled={pending} className={primaryClass}>{pending ? "Publicando…" : "Publicar"}</button>
    </form>
  );
}

export function ReplyForm({ topicId, page }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [state, action, pending] = useActionState(async (_state, formData) => {
    const result = await publishReply(topicId, formData);
    if (result.error) return result;

    setBody("");
    if (page > 1) router.replace(`/forum/${topicId}#respostas`);
    return null;
  }, null);

  return (
    <form action={action} className="space-y-3" aria-busy={pending}>
      <label htmlFor="reply-body" className="block text-sm font-bold">Escreva uma resposta</label>
      <textarea id="reply-body" name="body" value={body} onChange={(event) => setBody(event.target.value)} minLength={2} maxLength={REPLY_LIMIT} required readOnly={pending} rows={4} className={fieldClass} />
      <FormError message={state?.error} />
      <button type="submit" disabled={pending} className={primaryClass}>{pending ? "Enviando…" : "Responder"}</button>
    </form>
  );
}

export function ForumActionButton({ children, className, pressed }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} aria-pressed={pressed} className={className}>{children}</button>;
}
