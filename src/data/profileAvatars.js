import { Bot, Cpu, Rocket, Sparkles, Terminal } from "lucide-react";

export const AVATAR_STORAGE_KEY = "manual-nao-avatar";
export const AVATAR_CHANGE_EVENT = "nao-avatar-change";

export const PRESET_AVATARS = [
  {
    id: "robot",
    label: "Robô",
    icon: Bot,
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "engineer",
    label: "Engenheiro",
    icon: Cpu,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "pioneer",
    label: "Pioneiro",
    icon: Rocket,
    gradient: "from-violet-500 to-purple-700",
  },
  {
    id: "inventor",
    label: "Inventor",
    icon: Sparkles,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "coder",
    label: "Dev",
    icon: Terminal,
    gradient: "from-rose-500 to-pink-600",
  },
];

export const DEFAULT_AVATAR_RAW = JSON.stringify({
  type: "preset",
  id: "robot",
});

export function parseAvatarValue(raw) {
  if (!raw) return { type: "preset", id: "robot" };
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.type === "photo" && typeof parsed.dataUrl === "string") {
      return parsed;
    }
    if (parsed?.type === "preset" && PRESET_AVATARS.some((a) => a.id === parsed.id)) {
      return parsed;
    }
  } catch {
    // Fallback para preset padrao
  }
  return { type: "preset", id: "robot" };
}

export function saveAvatarValue(value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(AVATAR_CHANGE_EVENT));
}

