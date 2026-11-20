import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getSessionCookie } from "better-auth/cookies";
import { cookiePrefix, createAuth } from "./auth-config.mjs";

let services;

export function getServices() {
  services ??= createAuth();
  return services;
}

export const getCurrentUser = cache(async () => {
  const requestHeaders = await headers();
  if (!getSessionCookie(requestHeaders, { cookiePrefix })) return null;

  const { auth } = await getServices();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) return null;

  const { id, name, email, role } = session.user;
  return { id, name, email, role };
});

export async function requireUser(path) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(path)}`);
  return user;
}

export async function requireAdmin(path = "/admin") {
  const user = await requireUser(path);
  if (user.role !== "admin") notFound();
  return user;
}
