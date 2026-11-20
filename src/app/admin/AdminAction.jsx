"use client";

import { useActionState, useState } from "react";
import { manageEntry } from "./actions";

export default function AdminAction({ action, id, label, description }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return <button type="button" onClick={() => setOpen(true)} className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-800">{label}</button>;
  }

  return <AdminConfirmation action={action} id={id} label={label} description={description} onClose={() => setOpen(false)} />;
}

function AdminConfirmation({ action, id, label, description, onClose }) {
  const [state, submit, pending] = useActionState(manageEntry.bind(null, action, id), null);

  return (
    <form action={submit} className="space-y-3 rounded-xl border border-neutral-300 p-3 dark:border-neutral-700">
      <label className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-200">
        <input type="checkbox" name="confirmed" value="yes" required className="mt-1" />
        <span>{description}</span>
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" disabled={pending || Boolean(state?.success)} className="rounded-lg bg-red-800 px-3 py-2 text-sm font-bold text-white hover:bg-red-900 disabled:opacity-60">{pending ? "Aguarde…" : `Confirmar ${label.toLowerCase()}`}</button>
        <button type="button" disabled={pending} onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-bold text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800">{state?.success ? "Fechar" : "Cancelar"}</button>
      </div>
      {state?.error && <p role="alert" className="text-sm text-red-800 dark:text-red-300">{state.error}</p>}
      {state?.success && <p role="status" className="text-sm font-bold">{state.success}</p>}
    </form>
  );
}
