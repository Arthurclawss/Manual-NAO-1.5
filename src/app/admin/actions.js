"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { performAdminAction } from "@/lib/admin-store";

export async function manageEntry(action, id, _state, formData) {
  const admin = await requireAdmin();
  if (typeof id !== "string" || id.length < 1 || id.length > 128 || admin.id === id) {
    return { error: "Ação indisponível para este registro." };
  }
  if (formData.get("confirmed") !== "yes") return { error: "Confirme a ação antes de continuar." };

  const changed = await performAdminAction(admin.id, action, id);
  if (!changed) return { error: "Ação indisponível ou já concluída." };

  revalidatePath("/admin");
  if (action !== "revoke-sessions") {
    revalidatePath("/dashboard");
    revalidatePath("/forum", "layout");
  }
  return { success: action === "revoke-sessions" ? "Sessões encerradas." : "Registro excluído." };
}
