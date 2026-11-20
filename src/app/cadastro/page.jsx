import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { loginDestination } from "@/lib/login-destination";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Criar conta | Manual do NAO" };

export default async function CadastroPage({ searchParams }) {
  const destination = loginDestination((await searchParams).next);
  if (await getCurrentUser()) redirect(destination);

  return <AuthForm registering destination={destination} />;
}
