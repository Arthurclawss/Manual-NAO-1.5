import "server-only";
import { randomUUID } from "node:crypto";
import { sql } from "kysely";
import { getServices } from "./session";

const TOPICS_PER_PAGE = 12;
const REPLIES_PER_PAGE = 25;

function topicSummary(db) {
  return db.selectFrom("forum_topics as topic")
    .innerJoin("user as author", "author.id", "topic.author_id")
    .select([
      "topic.id", "topic.title", "topic.category", "topic.created_at", "topic.closed_at", "topic.hidden_at",
      "author.name as author_name",
    ])
    .select((eb) => [
      eb.selectFrom("forum_replies").select((reply) => reply.fn.countAll().as("count"))
        .whereRef("topic_id", "=", "topic.id").where("hidden_at", "is", null).as("reply_count"),
      eb.selectFrom("forum_likes").select((like) => like.fn.countAll().as("count"))
        .whereRef("topic_id", "=", "topic.id").as("like_count"),
      eb.selectFrom("forum_attachments").select((file) => file.fn.countAll().as("count"))
        .whereRef("topic_id", "=", "topic.id").as("attachment_count"),
    ]);
}

export async function listForumTopics({ category, search, sort, hidden = false, page = 1, limit = TOPICS_PER_PAGE } = {}) {
  const { db } = await getServices();
  let query = topicSummary(db).where("topic.hidden_at", hidden ? "is not" : "is", null)
    .select(sql`substr(${sql.ref("topic.body")}, 1, 240)`.as("preview"));

  if (category) query = query.where("topic.category", "=", category);
  if (search) {
    const pattern = `%${search.toLowerCase().replace(/[!%_]/g, "!$&")}%`;
    query = query.where(sql`(lower(${sql.ref("topic.title")}) like ${pattern} escape '!' or lower(${sql.ref("topic.body")}) like ${pattern} escape '!')`);
  }
  if (sort === "atividade") {
    query = query.select((eb) => eb.fn.coalesce(
      eb.selectFrom("forum_replies").select((reply) => reply.fn.max("created_at").as("last_reply"))
        .whereRef("topic_id", "=", "topic.id").where("hidden_at", "is", null),
      eb.ref("topic.created_at"),
    ).as("last_activity")).orderBy("last_activity", "desc");
  }

  const rows = await query.orderBy("topic.created_at", "desc").orderBy("topic.id", "desc")
    .offset((page - 1) * limit).limit(limit + 1).execute();
  return { topics: rows.slice(0, limit), hasMore: rows.length > limit };
}

export async function getForumTopic(id, userId, moderator, page) {
  const { db } = await getServices();
  let query = topicSummary(db).select("topic.body").where("topic.id", "=", id);
  if (!moderator) query = query.where("topic.hidden_at", "is", null);
  const topic = await query.executeTakeFirst();
  if (!topic) return null;

  let repliesQuery = db.selectFrom("forum_replies as reply")
    .innerJoin("user as author", "author.id", "reply.author_id")
    .select(["reply.id", "reply.body", "reply.created_at", "reply.hidden_at", "author.name as author_name"])
    .where("reply.topic_id", "=", id);
  if (!moderator) repliesQuery = repliesQuery.where("reply.hidden_at", "is", null);

  const [replies, attachments, like] = await Promise.all([
    repliesQuery.orderBy("reply.created_at", "desc").orderBy("reply.id", "desc")
      .offset((page - 1) * REPLIES_PER_PAGE).limit(REPLIES_PER_PAGE + 1).execute(),
    db.selectFrom("forum_attachments").select(["id", "filename", "size_bytes"])
      .where("topic_id", "=", id).orderBy("filename").execute(),
    db.selectFrom("forum_likes").select("user_id").where("topic_id", "=", id).where("user_id", "=", userId).executeTakeFirst(),
  ]);

  return { ...topic, attachments, replies: replies.slice(0, REPLIES_PER_PAGE), liked: Boolean(like), hasMoreReplies: replies.length > REPLIES_PER_PAGE };
}

export async function createForumTopic({ authorId, category, title, body, files }) {
  const { db } = await getServices();
  const id = randomUUID();
  const attachments = await Promise.all(files.map(async (file) => ({
    id: randomUUID(),
    topic_id: id,
    filename: file.name.split(/[/\\]/).at(-1).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200),
    size_bytes: file.size,
    content: Buffer.from(await file.arrayBuffer()),
  })));

  await db.transaction().execute(async (transaction) => {
    await transaction.insertInto("forum_topics").values({ id, author_id: authorId, category, title, body, created_at: Date.now() }).execute();
    if (attachments.length) await transaction.insertInto("forum_attachments").values(attachments).execute();
  });
  return id;
}

export async function addForumReply(topicId, authorId, body) {
  const { db } = await getServices();
  const result = await db.insertInto("forum_replies").columns(["id", "topic_id", "author_id", "body", "created_at"])
    .expression((eb) => eb.selectFrom("forum_topics").select([
      eb.val(randomUUID()).as("reply_id"), "id", eb.val(authorId).as("author_id"), eb.val(body).as("body"), eb.val(Date.now()).as("created_at"),
    ]).where("id", "=", topicId).where("closed_at", "is", null).where("hidden_at", "is", null))
    .executeTakeFirstOrThrow();

  return result.numInsertedOrUpdatedRows > 0n;
}

export async function setForumLike(topicId, userId, liked) {
  const { db } = await getServices();
  if (liked) {
    await db.insertInto("forum_likes").columns(["topic_id", "user_id"])
      .expression((eb) => eb.selectFrom("forum_topics").select(["id", eb.val(userId).as("user_id")])
        .where("id", "=", topicId).where("hidden_at", "is", null))
      .onConflict((conflict) => conflict.columns(["topic_id", "user_id"]).doNothing()).execute();
  } else {
    await db.deleteFrom("forum_likes").where("topic_id", "=", topicId).where("user_id", "=", userId).execute();
  }
}

export async function updateTopicModeration(id, changes) {
  const { db } = await getServices();
  await db.updateTable("forum_topics").set(changes).where("id", "=", id).execute();
}

export async function updateReplyModeration(topicId, replyId, hiddenAt) {
  const { db } = await getServices();
  await db.updateTable("forum_replies").set({ hidden_at: hiddenAt })
    .where("topic_id", "=", topicId).where("id", "=", replyId).execute();
}

export async function getForumAttachment(topicId, fileId, moderator) {
  const { db } = await getServices();
  let query = db.selectFrom("forum_attachments as file").innerJoin("forum_topics as topic", "topic.id", "file.topic_id")
    .select(["file.filename", "file.size_bytes", "file.content"])
    .where("file.id", "=", fileId).where("file.topic_id", "=", topicId);
  if (!moderator) query = query.where("topic.hidden_at", "is", null);
  return query.executeTakeFirst();
}
