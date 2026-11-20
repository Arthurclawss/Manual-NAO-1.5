import { sql } from "kysely";

export async function migrateForum(db, databaseType) {
  await db.schema.createTable("forum_topics").ifNotExists()
    .addColumn("id", "text", (column) => column.primaryKey().notNull())
    .addColumn("author_id", "text", (column) => column.notNull().references("user.id").onDelete("cascade"))
    .addColumn("category", "text", (column) => column.notNull())
    .addColumn("title", "text", (column) => column.notNull())
    .addColumn("body", "text", (column) => column.notNull())
    .addColumn("created_at", "bigint", (column) => column.notNull())
    .addColumn("closed_at", "bigint")
    .addColumn("hidden_at", "bigint")
    .execute();

  await db.schema.createTable("forum_replies").ifNotExists()
    .addColumn("id", "text", (column) => column.primaryKey().notNull())
    .addColumn("topic_id", "text", (column) => column.notNull().references("forum_topics.id").onDelete("cascade"))
    .addColumn("author_id", "text", (column) => column.notNull().references("user.id").onDelete("cascade"))
    .addColumn("body", "text", (column) => column.notNull())
    .addColumn("created_at", "bigint", (column) => column.notNull())
    .addColumn("hidden_at", "bigint")
    .execute();

  await db.schema.createTable("forum_likes").ifNotExists()
    .addColumn("topic_id", "text", (column) => column.notNull().references("forum_topics.id").onDelete("cascade"))
    .addColumn("user_id", "text", (column) => column.notNull().references("user.id").onDelete("cascade"))
    .addPrimaryKeyConstraint("forum_likes_pk", ["topic_id", "user_id"])
    .execute();

  await db.schema.createTable("forum_attachments").ifNotExists()
    .addColumn("id", "text", (column) => column.primaryKey().notNull())
    .addColumn("topic_id", "text", (column) => column.notNull().references("forum_topics.id").onDelete("cascade"))
    .addColumn("filename", "text", (column) => column.notNull())
    .addColumn("size_bytes", "integer", (column) => column.notNull())
    .addColumn("content", databaseType === "postgres" ? "bytea" : sql`blob`, (column) => column.notNull())
    .execute();

  await db.schema.createIndex("forum_topics_created_idx").ifNotExists().on("forum_topics").column("created_at").execute();
  await db.schema.createIndex("forum_replies_topic_created_idx").ifNotExists().on("forum_replies").columns(["topic_id", "created_at"]).execute();
  await db.schema.createIndex("forum_attachments_topic_idx").ifNotExists().on("forum_attachments").column("topic_id").execute();
}
