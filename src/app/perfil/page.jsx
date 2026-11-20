import { requireUser } from "@/lib/session";
import Perfil from "./Perfil";

export default async function PerfilPage() {
  const { name, email, role } = await requireUser("/perfil");
  return <Perfil name={name} email={email} role={role} />;
}
