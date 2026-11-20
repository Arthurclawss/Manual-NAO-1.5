import "server-only";
import { randomUUID } from "node:crypto";
import { sql } from "kysely";
import { getServices } from "./session";

const PAGE_SIZE = 20;

export async function listAdminEntries(section, search, page) {
  const { db } = await getServices();
  const pattern = `%${search.toLowerCase().replace(/[!%_]/g, "!$&")}%`;
  let query;

  if (section === "publicacoes") {
    query = db.selectFrom("forum_topics as topic").innerJoin("user as author", "author.id", "topic.author_id")
      .select(["topic.id", "topic.title", "topic.hidden_at", "topic.closed_at", "topic.created_at", "author.name as author_name"])
      .orderBy("topic.created_at", "desc").orderBy("topic.id", "desc");
    if (search) query = query.where(sql`lower(${sql.ref("topic.title")}) like ${pattern} escape '!'`);
  } else if (section === "historico") {
    query = db.selectFrom("admin_audit as log").leftJoin("user as actor", "actor.id", "log.actor_id")
      .select(["log.id", "log.action", "log.created_at", "log.target_id", "actor.name as actor_name"])
      .orderBy("log.created_at", "desc").orderBy("log.id", "desc");
  } else {
    query = db.selectFrom("user as account").select(["account.id", "account.name", "account.email", "account.role"])
      .select((eb) => eb.selectFrom("session").select((session) => session.fn.countAll().as("count"))
        .whereRef("userId", "=", "account.id").where("expiresAt", ">", new Date().toISOString()).as("session_count"))
      .orderBy("account.createdAt", "desc").orderBy("account.id", "desc");
    if (search) query = query.where(sql`(lower(${sql.ref("account.name")}) like ${pattern} escape '!' or lower(${sql.ref("account.email")}) like ${pattern} escape '!')`);
  }

  const rows = await query.offset((page - 1) * PAGE_SIZE).limit(PAGE_SIZE + 1).execute();
  return { rows: rows.slice(0, PAGE_SIZE), hasMore: rows.length > PAGE_SIZE };
}

export async function performAdminAction(actorId, action, targetId) {
  const { db } = await getServices();
  return db.transaction().execute(async (transaction) => {
    let result;

    if (action === "delete-topic") {
      result = await transaction.deleteFrom("forum_topics").where("id", "=", targetId).executeTakeFirst();
    } else if (action === "delete-account") {
      result = await transaction.deleteFrom("user").where("id", "=", targetId).where("role", "!=", "admin").executeTakeFirst();
    } else if (action === "revoke-sessions") {
      result = await transaction.deleteFrom("session").where("userId", "=", targetId)
        .where("userId", "in", transaction.selectFrom("user").select("id").where("role", "!=", "admin"))
        .executeTakeFirst();
    } else {
      return false;
    }

    if (!result.numDeletedRows) return false;
    await transaction.insertInto("admin_audit").values({
      id: randomUUID(), actor_id: actorId, action, target_id: targetId, created_at: Date.now(),
    }).execute();
    return true;
  });
}
