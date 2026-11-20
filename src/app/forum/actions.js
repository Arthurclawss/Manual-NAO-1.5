"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { canModerate, getAttachmentError, isForumCategory, isForumId, REPLY_LIMIT, TOPIC_BODY_LIMIT, TOPIC_TITLE_LIMIT } from "@/lib/forum-rules";
import { addForumReply, createForumTopic, setForumLike, updateReplyModeration, updateTopicModeration } from "@/lib/forum-store";

function field(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function refreshForum(topicId) {
  revalidatePath("/forum");
  revalidatePath("/dashboard");
  if (topicId) revalidatePath(`/forum/${topicId}`);
}

export async function publishTopic(_state, formData) {
  const user = await requireUser("/forum/novo");
  const title = field(formData, "title");
  const category = field(formData, "category");
  const body = field(formData, "body");

  if (title.length < 5 || title.length > TOPIC_TITLE_LIMIT) return { error: `O título deve ter entre 5 e ${TOPIC_TITLE_LIMIT} caracteres.` };
  if (!isForumCategory(category)) return { error: "Selecione uma categoria." };
  if (body.length < 10 || body.length > TOPIC_BODY_LIMIT) return { error: `O texto deve ter entre 10 e ${TOPIC_BODY_LIMIT} caracteres.` };

  const files = formData.getAll("files").filter((file) => file instanceof File && file.name);
  const error = getAttachmentError(files);
  if (error) return { error };

  const id = await createForumTopic({ authorId: user.id, title, category, body, files });
  refreshForum(id);
  redirect(`/forum/${id}`);
}

export async function publishReply(id, formData) {
  if (!isForumId(id)) return { error: "Publicação indisponível." };
  const path = `/forum/${id}`;
  const user = await requireUser(path);
  const body = field(formData, "body");
  if (body.length < 2 || body.length > REPLY_LIMIT) return { error: `A resposta deve ter entre 2 e ${REPLY_LIMIT} caracteres.` };

  if (!(await addForumReply(id, user.id, body))) return { error: "Esta publicação está indisponível para novas respostas." };
  refreshForum(id);
  return { success: true };
}

export async function updateLike(id, liked) {
  if (!isForumId(id) || typeof liked !== "boolean") return;
  const user = await requireUser(`/forum/${id}`);
  await setForumLike(id, user.id, liked);
  refreshForum(id);
}

export async function moderateTopic(id, intent) {
  if (!isForumId(id)) return;
  const user = await requireUser(`/forum/${id}`);
  if (!canModerate(user.role)) return;

  const changes = {
    close: { closed_at: Date.now() },
    reopen: { closed_at: null },
    hide: { hidden_at: Date.now() },
    restore: { hidden_at: null },
  };
  if (!Object.hasOwn(changes, intent)) return;
  await updateTopicModeration(id, changes[intent]);
  refreshForum(id);
}

export async function moderateReply(topicId, replyId, hide) {
  if (!isForumId(topicId) || !isForumId(replyId) || typeof hide !== "boolean") return;
  const user = await requireUser(`/forum/${topicId}`);
  if (!canModerate(user.role)) return;
  await updateReplyModeration(topicId, replyId, hide ? Date.now() : null);
  refreshForum(topicId);
}
