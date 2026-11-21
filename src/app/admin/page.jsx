import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { listAdminEntries } from "@/lib/admin-store";
import { fieldClass, ForumDate, ForumPagination, ForumShell, panelClass, primaryClass, secondaryClass } from "../forum/ForumUi";
import { getForumPage } from "../forum/query";
import AdminAction from "./AdminAction";
import SplitText from "@/components/SplitText";

export const metadata = { title: "Administração | Manual do NAO", robots: { index: false, follow: false } };

const sections = { contas: "Contas", publicacoes: "Publicações", historico: "Histórico" };
const actionLabels = { "delete-topic": "Publicação excluída", "delete-account": "Conta excluída", "revoke-sessions": "Sessões encerradas", "grant-admin": "Administrador concedido" };
const roleLabels = { student: "Participante", moderator: "Moderador", admin: "Administrador" };

export default async function AdminPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const section = typeof params.secao === "string" && Object.hasOwn(sections, params.secao) ? params.secao : "contas";
  const search = section !== "historico" && typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const page = getForumPage(params.pagina);
  const { rows, hasMore } = await listAdminEntries(section, search, page);

  function pageHref(nextPage) {
    const query = new URLSearchParams({ secao: section });
    if (search) query.set("q", search);
    if (nextPage > 1) query.set("pagina", nextPage);
    return `/admin?${query}`;
  }

  return (
    <ForumShell>
      <header className={`${panelClass} flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7`}>
        <SplitText
          text="Administração"
          tag="h1"
          delay={35}
          className="text-3xl font-black tracking-tight text-neutral-950 dark:text-white"
        />
        <Link href="/admin/modulos" className={secondaryClass}>Editar módulos</Link>
      </header>

      <nav aria-label="Seções da administração" className="flex flex-wrap gap-2">
        {Object.entries(sections).map(([key, label]) => (
          <Link key={key} href={`/admin?secao=${key}`} aria-current={section === key ? "page" : undefined} className={section === key ? primaryClass : secondaryClass}>{label}</Link>
        ))}
      </nav>

      {section !== "historico" && (
        <form method="get" action="/admin" className={`${panelClass} flex flex-wrap items-end gap-3 p-4`}>
          <input type="hidden" name="secao" value={section} />
          <div className="min-w-0 flex-1 space-y-1">
            <label htmlFor="admin-search" className="block text-sm font-bold text-neutral-800 dark:text-neutral-200">{section === "contas" ? "Nome ou e-mail" : "Título da publicação"}</label>
            <input id="admin-search" name="q" type="search" maxLength={100} defaultValue={search} className={fieldClass} />
          </div>
          <button type="submit" className={primaryClass}>Buscar</button>
        </form>
      )}

      {rows.length === 0 && <p className={`${panelClass} p-5 text-neutral-700 dark:text-neutral-300`}>Nenhum registro encontrado.</p>}
      <ul className="space-y-3" aria-label={sections[section]}>
        {rows.map((row) => (
          <li key={row.id} className={`${panelClass} space-y-3 p-4 sm:p-5`}>
            {section === "contas" && <AccountRow row={row} />}
            {section === "publicacoes" && <TopicRow row={row} />}
            {section === "historico" && (
              <div className="space-y-1">
                <h2 className="font-extrabold text-neutral-950 dark:text-white">{actionLabels[row.action]}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{row.actor_name || "Administrador"} · <ForumDate value={row.created_at} /></p>
                <p className="break-all text-sm text-neutral-600 dark:text-neutral-400">Registro {row.target_id}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ForumPagination page={page} hasMore={hasMore} href={pageHref} />
    </ForumShell>
  );
}

function AccountRow({ row }) {
  const activeSessions = Number(row.session_count);
  return (
    <>
      <div className="space-y-1">
        <h2 className="break-words font-extrabold text-neutral-950 dark:text-white">{row.name}</h2>
        <p className="break-words text-sm text-neutral-600 dark:text-neutral-300">{row.email}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{roleLabels[row.role] || row.role} · {activeSessions} {activeSessions === 1 ? "sessão válida" : "sessões válidas"}</p>
      </div>
      {row.role !== "admin" && (
        <div className="flex flex-wrap items-start gap-2">
          <AdminAction action="grant-admin" id={row.id} label="Tornar administrador" description="Confirmo que esta conta terá acesso total ao painel administrativo, aos módulos e à moderação." />
          {activeSessions > 0 && <AdminAction action="revoke-sessions" id={row.id} label="Encerrar sessões" description="Confirmo que a pessoa terá de entrar novamente em todos os dispositivos." />}
          <AdminAction action="delete-account" id={row.id} label="Excluir conta" description="Confirmo a exclusão definitiva da conta, das publicações, dos anexos, das respostas e das curtidas associadas. As respostas nos tópicos excluídos também serão removidas." />
        </div>
      )}
    </>
  );
}

function TopicRow({ row }) {
  return (
    <>
      <div className="space-y-1">
        <h2 className="break-words font-extrabold text-neutral-950 dark:text-white"><Link href={`/forum/${row.id}`} className="hover:underline">{row.title}</Link></h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{row.author_name} · <ForumDate value={row.created_at} /></p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{row.hidden_at ? "Ocultada" : "Visível"} · {row.closed_at ? "Encerrada" : "Aberta"}</p>
      </div>
      <AdminAction action="delete-topic" id={row.id} label="Excluir publicação" description="Confirmo a exclusão definitiva da publicação, de todas as respostas, das curtidas e dos anexos." />
    </>
  );
}
