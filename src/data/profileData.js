export const userProfile = {
  name: "Explorador NAO",
  role: "Estudante",
  journey: "Primeiros passos",
  accountType: "Perfil local",
};

export const robotParts = [
  { name: "Base", threshold: 8, clipPath: "polygon(10% 84%, 90% 84%, 90% 100%, 10% 100%)" },
  { name: "Pernas", threshold: 20, clipPath: "polygon(16% 54%, 84% 54%, 90% 92%, 10% 92%)" },
  { name: "Quadril", threshold: 32, clipPath: "polygon(22% 44%, 78% 44%, 74% 62%, 26% 62%)" },
  { name: "Torso", threshold: 45, clipPath: "polygon(22% 20%, 78% 20%, 75% 55%, 25% 55%)" },
  { name: "Braço esquerdo", threshold: 58, clipPath: "polygon(0 20%, 36% 20%, 37% 69%, 0 69%)" },
  { name: "Braço direito", threshold: 70, clipPath: "polygon(64% 20%, 100% 20%, 100% 69%, 63% 69%)" },
  { name: "Cabeça", threshold: 85, clipPath: "polygon(20% 0, 80% 0, 82% 28%, 18% 28%)" },
  { name: "NAO completo", threshold: 100, clipPath: "inset(0)" },
];

export function calculateProfileProgress(modules) {
  const totalXp = modules.reduce((total, module) => total + (module.xp || 0), 0);
  const earnedXp = modules.reduce(
    (total, module) => total + Math.round((module.xp || 0) * ((module.progress || 0) / 100)),
    0
  );
  const completedModules = modules.filter((module) => (module.progress || 0) >= 100).length;
  const overallProgress = totalXp > 0 ? Math.round((earnedXp / totalXp) * 100) : 0;
  const xpPerLevel = 250;
  const level = Math.floor(earnedXp / xpPerLevel) + 1;
  const xpInCurrentLevel = earnedXp % xpPerLevel;
  const unlockedParts = robotParts.filter((part) => overallProgress >= part.threshold).length;

  return {
    totalXp,
    earnedXp,
    completedModules,
    totalModules: modules.length,
    overallProgress,
    level,
    xpPerLevel,
    xpInCurrentLevel,
    levelProgress: Math.round((xpInCurrentLevel / xpPerLevel) * 100),
    unlockedParts,
    totalRobotParts: robotParts.length,
  };
}
