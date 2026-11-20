export async function migrateAdmin(db) {
  await db.schema.createTable("admin_audit").ifNotExists()
    .addColumn("id", "text", (column) => column.primaryKey().notNull())
    .addColumn("actor_id", "text", (column) => column.notNull())
    .addColumn("target_id", "text", (column) => column.notNull())
    .addColumn("action", "text", (column) => column.notNull())
    .addColumn("created_at", "bigint", (column) => column.notNull())
    .execute();
}
