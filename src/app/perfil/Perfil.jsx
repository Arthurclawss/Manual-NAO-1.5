"use client";

import BlueprintBackground from "@/components/BlueprintBackground";
import { useModules } from "@/components/useModules";
import { calculateProfileProgress } from "@/data/profileData";
import PerfilDesktop from "./PerfilDesktop";
import PerfilMobile from "./PerfilMobile";

export default function Perfil({ name, email, role }) {
  const modules = useModules();
  const progress = calculateProfileProgress(modules);
  const roleLabel = role === "admin" ? "Administrador" : role === "moderator" ? "Moderador" : "Estudante";
  const { overallProgress } = progress;
  // Compensa a margem transparente no topo e na base da imagem.
  const visualLevel = overallProgress > 0 && overallProgress < 100
    ? Math.round(12 + (overallProgress / 100) * 76)
    : overallProgress;

  const profile = { name, email, roleLabel, progress, visualLevel };

  return (
    <main id="conteudo-principal" className="relative min-h-full md:min-h-screen">
      <BlueprintBackground />
      <PerfilMobile {...profile} />
      <PerfilDesktop {...profile} />
    </main>
  );
}
