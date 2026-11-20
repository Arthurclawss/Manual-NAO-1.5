import { calculateProfileProgress } from "@/data/profileData";

export const ACHIEVEMENT_CATEGORIES = [
  "Todas",
  "Módulos",
  "Robô NAO",
  "XP & Níveis",
  "Comunidade",
];

export const RARITY_STYLES = {
  Comum: {
    badge: "bg-slate-100 text-slate-700 dark:bg-neutral-700/60 dark:text-neutral-200",
    glow: "border-slate-200 dark:border-neutral-700/60",
    iconBg: "from-slate-500 to-slate-600",
  },
  Rara: {
    badge: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300",
    glow: "border-sky-300/70 dark:border-sky-500/40",
    iconBg: "from-sky-400 to-sky-600",
  },
  Épica: {
    badge: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
    glow: "border-violet-300/70 dark:border-violet-500/40",
    iconBg: "from-violet-500 to-purple-600",
  },
  Lendária: {
    badge: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
    glow: "border-amber-300/80 dark:border-amber-500/40",
    iconBg: "from-amber-400 to-orange-500",
  },
};

function clampProgress(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function evaluateAchievements(modules) {
  const stats = calculateProfileProgress(modules);
  const firstModule = modules[0];
  const firstModuleProgress = firstModule ? firstModule.progress || 0 : 0;

  const definitions = [
    {
      id: "first-access",
      title: "Primeiro Contato",
      description: "Deu o primeiro passo na sua jornada pelo Manual Digital do NAO.",
      category: "Módulos",
      rarity: "Comum",
      xpReward: 50,
      iconKey: "compass",
      unlocked: true,
      progress: 100,
      hint: "Conquista liberada ao iniciar sua trilha.",
      actionHref: "/modulo1",
      actionLabel: "Ir para o Módulo 1",
    },
    {
      id: "module-1-start",
      title: "Curiosidade Robótica",
      description: "Avançou pelo menos 25% no primeiro módulo de introdução ao NAO.",
      category: "Módulos",
      rarity: "Comum",
      xpReward: 75,
      iconKey: "book",
      unlocked: firstModuleProgress >= 25,
      progress: clampProgress((firstModuleProgress / 25) * 100),
      hint: `Progresso atual no Módulo 1: ${firstModuleProgress}% de 25%.`,
      actionHref: "/modulo1",
      actionLabel: "Continuar Módulo 1",
    },
    {
      id: "module-1-done",
      title: "Engenheiro Iniciante",
      description: "Concluiu 100% do Módulo 1 e dominou os fundamentos do robô.",
      category: "Módulos",
      rarity: "Rara",
      xpReward: 150,
      iconKey: "graduation",
      unlocked: stats.completedModules >= 1,
      progress: clampProgress(firstModuleProgress),
      hint: `Faltam ${Math.max(0, 100 - firstModuleProgress)}% para concluir o Módulo 1.`,
      actionHref: "/modulo1",
      actionLabel: "Concluir Módulo 1",
    },
    {
      id: "all-modules",
      title: "Mestre dos Capítulos",
      description: "Completou todos os módulos disponíveis na trilha de aprendizado.",
      category: "Módulos",
      rarity: "Lendária",
      xpReward: 400,
      iconKey: "crown",
      unlocked: stats.totalModules > 0 && stats.completedModules >= stats.totalModules,
      progress:
        stats.totalModules > 0
          ? clampProgress((stats.completedModules / stats.totalModules) * 100)
          : 0,
      hint: `${stats.completedModules} de ${stats.totalModules} módulos concluídos.`,
      actionHref: "/capitulos",
      actionLabel: "Ver capítulos",
    },
    {
      id: "first-part",
      title: "Primeira Peça",
      description: "Liberou a base do seu robô NAO ao atingir 8% de progresso geral.",
      category: "Robô NAO",
      rarity: "Comum",
      xpReward: 80,
      iconKey: "cpu",
      unlocked: stats.unlockedParts >= 1,
      progress: clampProgress((stats.overallProgress / 8) * 100),
      hint: `Progresso geral: ${stats.overallProgress}% de 8%.`,
      actionHref: "/perfil",
      actionLabel: "Ver montagem do NAO",
    },
    {
      id: "half-robot",
      title: "Meio Caminho Montado",
      description: "Desbloqueou 4 das 8 peças estruturais do seu NAO.",
      category: "Robô NAO",
      rarity: "Rara",
      xpReward: 180,
      iconKey: "wrench",
      unlocked: stats.unlockedParts >= 4,
      progress: clampProgress((stats.unlockedParts / 4) * 100),
      hint: `${stats.unlockedParts} de 4 peças desbloqueadas.`,
      actionHref: "/perfil",
      actionLabel: "Ver peças do NAO",
    },
    {
      id: "full-robot",
      title: "NAO 100% Construído",
      description: "Montou todas as 8 peças do robô humanoide NAO.",
      category: "Robô NAO",
      rarity: "Lendária",
      xpReward: 500,
      iconKey: "bot",
      unlocked: stats.unlockedParts >= stats.totalRobotParts,
      progress: clampProgress((stats.unlockedParts / stats.totalRobotParts) * 100),
      hint: `${stats.unlockedParts} de ${stats.totalRobotParts} peças liberadas.`,
      actionHref: "/perfil",
      actionLabel: "Ver NAO completo",
    },
    {
      id: "xp-100",
      title: "Primeira Centena",
      description: "Acumulou 100 XP explorando os conteúdos do manual.",
      category: "XP & Níveis",
      rarity: "Comum",
      xpReward: 60,
      iconKey: "zap",
      unlocked: stats.earnedXp >= 100,
      progress: clampProgress((stats.earnedXp / 100) * 100),
      hint: `${stats.earnedXp} de 100 XP acumulados.`,
      actionHref: "/dashboard",
      actionLabel: "Explorar módulos",
    },
    {
      id: "level-2",
      title: "Subindo de Patente",
      description: "Alcançou o Nível 2 na sua jornada de robótica educacional.",
      category: "XP & Níveis",
      rarity: "Rara",
      xpReward: 150,
      iconKey: "trophy",
      unlocked: stats.level >= 2,
      progress: stats.level >= 2 ? 100 : stats.levelProgress,
      hint: `Nível atual: ${stats.level} (${stats.xpInCurrentLevel}/${stats.xpPerLevel} XP).`,
      actionHref: "/dashboard",
      actionLabel: "Ganhar mais XP",
    },
    {
      id: "level-5",
      title: "Veterano em Robótica",
      description: "Atingiu o Nível 5 com dedicação contínua nos estudos.",
      category: "XP & Níveis",
      rarity: "Épica",
      xpReward: 350,
      iconKey: "sparkles",
      unlocked: stats.level >= 5,
      progress: clampProgress((stats.earnedXp / (stats.xpPerLevel * 4)) * 100),
      hint: `Alcance ${stats.xpPerLevel * 4} XP para chegar ao Nível 5.`,
      actionHref: "/dashboard",
      actionLabel: "Continuar trilha",
    },
    {
      id: "forum-voice",
      title: "Voz da Comunidade",
      description: "Participou das discussões no Fórum tirando dúvidas ou ajudando colegas.",
      category: "Comunidade",
      rarity: "Rara",
      xpReward: 120,
      iconKey: "message",
      unlocked: false,
      progress: 0,
      hint: "Visite o Fórum no Dashboard e participe de um tópico.",
      actionHref: "/dashboard#forum",
      actionLabel: "Abrir Fórum",
    },
    {
      id: "study-streak",
      title: "Ritmo Constante",
      description: "Manteve uma sequência de 3 dias consecutivos de estudo no manual.",
      category: "Comunidade",
      rarity: "Épica",
      xpReward: 200,
      iconKey: "flame",
      unlocked: false,
      progress: 0,
      hint: "Retorne ao manual por 3 dias seguidos para desbloquear.",
      actionHref: "/dashboard",
      actionLabel: "Ver sequência",
    },
  ];

  const unlockedCount = definitions.filter((item) => item.unlocked).length;
  const totalCount = definitions.length;
  const bonusXp = definitions
    .filter((item) => item.unlocked)
    .reduce((sum, item) => sum + item.xpReward, 0);

  const nextAchievement =
    definitions
      .filter((item) => !item.unlocked)
      .sort((a, b) => b.progress - a.progress)[0] || null;

  const rank =
    unlockedCount >= 10
      ? "Mestre NAO"
      : unlockedCount >= 6
        ? "Especialista"
        : unlockedCount >= 3
          ? "Construtor"
          : "Iniciante";

  return {
    achievements: definitions,
    unlockedCount,
    totalCount,
    completionPercent: totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0,
    bonusXp,
    rank,
    nextAchievement,
  };
}

