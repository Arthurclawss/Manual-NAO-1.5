import { isForumId } from "./forum-rules";

export function loginDestination(path) {
  if (["/dashboard", "/perfil", "/admin", "/admin/modulos", "/forum", "/forum/novo"].includes(path)) return path;
  if (typeof path === "string" && path.startsWith("/forum/") && isForumId(path.slice("/forum/".length))) return path;
  return "/dashboard";
}
