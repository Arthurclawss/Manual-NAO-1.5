import { createAuth } from "../src/lib/auth-config.mjs";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error("Uso: npm run admin:grant -- email-da-conta");
  process.exit(1);
}

const { db } = await createAuth();
try {
  const result = await db.updateTable("user").set({ role: "admin" }).where("email", "=", email).executeTakeFirst();
  if (!result.numUpdatedRows) throw new Error("Conta não encontrada. Faça o cadastro primeiro.");
  console.log("Acesso administrativo concedido.");
} finally {
  await db.destroy();
}
