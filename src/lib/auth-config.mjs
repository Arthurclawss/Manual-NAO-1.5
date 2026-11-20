import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createKyselyAdapter } from "@better-auth/kysely-adapter";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import pg from "pg";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "./password-policy.mjs";

export const cookiePrefix = "manual-nao";

function getLocalSecret() {
  const path = resolve(/* turbopackIgnore: true */ ".data/auth-secret");
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });

  try {
    writeFileSync(path, randomBytes(32).toString("hex"), { flag: "wx", mode: 0o600 });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }

  return readFileSync(path, "utf8");
}

export async function createAuth() {
  const production = process.env.NODE_ENV === "production";
  const { BETTER_AUTH_SECRET, BETTER_AUTH_URL, DATABASE_URL, AUTH_SQLITE_PATH } = process.env;

  if (production && (!BETTER_AUTH_SECRET || !BETTER_AUTH_URL || (!DATABASE_URL && !AUTH_SQLITE_PATH))) {
    throw new Error("Configure BETTER_AUTH_SECRET, BETTER_AUTH_URL e DATABASE_URL ou AUTH_SQLITE_PATH para produção.");
  }
  if (production) {
    const origin = new URL(BETTER_AUTH_URL);
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
    if (origin.protocol !== "https:" && !(loopback && origin.protocol === "http:")) {
      throw new Error("BETTER_AUTH_URL deve usar HTTPS em produção.");
    }
  }

  const secret = BETTER_AUTH_SECRET || getLocalSecret();
  if (secret.length < 32) throw new Error("BETTER_AUTH_SECRET precisa ter pelo menos 32 caracteres.");

  let database;
  if (DATABASE_URL) {
    database = new pg.Pool({ connectionString: DATABASE_URL });
  } else {
    const path = resolve(/* turbopackIgnore: true */ AUTH_SQLITE_PATH || ".data/auth.sqlite");
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    database = new DatabaseSync(path, { enableForeignKeyConstraints: true });
    database.exec("PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL;");
  }

  const { kysely: db, databaseType, transaction } = await createKyselyAdapter({ database });

  const auth = betterAuth({
    appName: "Manual do NAO",
    database: { db, type: databaseType, transaction },
    secret,
    baseURL: BETTER_AUTH_URL || {
      allowedHosts: ["localhost", "localhost:*", "127.0.0.1", "127.0.0.1:*"],
      fallback: "http://localhost:3000",
      protocol: "http",
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    },
    user: {
      additionalFields: {
        role: { type: "string", required: true, defaultValue: "student", input: false },
      },
    },
    session: { expiresIn: 7 * 24 * 60 * 60, disableSessionRefresh: true },
    rateLimit: { enabled: production, storage: "database" },
    advanced: { cookiePrefix },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (!["/sign-up/email", "/update-user"].includes(ctx.path)) return;
        if (Object.hasOwn(ctx.body ?? {}, "role")) {
          throw new APIError("BAD_REQUEST", { code: "ROLE_NOT_ALLOWED", message: "O papel da conta é definido pelo servidor." });
        }
        if (typeof ctx.body?.name !== "string") return;

        const name = ctx.body.name.trim();
        if (name.length < 2 || name.length > 80) {
          throw new APIError("BAD_REQUEST", { code: "INVALID_DISPLAY_NAME", message: "Nome inválido." });
        }
        return { context: { body: { ...ctx.body, name } } };
      }),
    },
  });

  return { auth, db, databaseType };
}
