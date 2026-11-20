import { requireAdmin } from "@/lib/session";
import Admin from "../Admin";

export default async function AdminModulesPage() {
  await requireAdmin("/admin/modulos");
  return <Admin />;
}
