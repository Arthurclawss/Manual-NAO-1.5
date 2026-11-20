"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function signOut() {
    setPending(true);
    setFailed(false);

    try {
      const { error } = await authClient.signOut();
      if (!error) {
        window.location.replace("/login");
        return;
      }
    } catch {
      // The current session remains available while the request is retried.
    }

    setFailed(true);
    setPending(false);
  }

  return (
    <div className="sm:text-right">
      <button type="button" onClick={signOut} disabled={pending} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">
        <LogOut size={17} aria-hidden="true" /> {pending ? "Saindo…" : "Sair"}
      </button>
      {failed && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">Não foi possível sair. Tente novamente.</p>}
    </div>
  );
}
