import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { canModerate, isForumId } from "@/lib/forum-rules";
import { getForumAttachment } from "@/lib/forum-store";

export async function GET(_request, { params }) {
  const { id, fileId } = await params;
  if (!isForumId(id) || !isForumId(fileId)) notFound();
  const user = await requireUser(`/forum/${id}`);
  const file = await getForumAttachment(id, fileId, canModerate(user.role));
  if (!file) notFound();

  const encodedName = encodeURIComponent(file.filename.toWellFormed())
    .replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);

  return new Response(file.content, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="anexo"; filename*=UTF-8''${encodedName}`,
      "Content-Length": String(file.size_bytes),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
