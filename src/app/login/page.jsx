import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { loginDestination } from "@/lib/login-destination";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Entrar | Manual do NAO" };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  const destination = loginDestination(next);
  if (await getCurrentUser()) redirect(destination);

  return <AuthForm destination={destination} />;
}
