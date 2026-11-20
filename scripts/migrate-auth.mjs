import { getMigrations } from "better-auth/db/migration";
import { createAuth } from "../src/lib/auth-config.mjs";
import { migrateForum } from "../src/lib/forum-schema.mjs";
import { migrateAdmin } from "../src/lib/admin-schema.mjs";

const { auth, db, databaseType } = await createAuth();

try {
  const { runMigrations } = await getMigrations(auth.options);
  await runMigrations();
  await migrateForum(db, databaseType);
  await migrateAdmin(db);
  console.log("Banco de autenticação, fórum e administração atualizado.");
} finally {
  await db.destroy();
}
