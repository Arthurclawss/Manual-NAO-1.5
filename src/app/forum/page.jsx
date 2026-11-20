import Link from "next/link";
import { MessageCircle, Plus, Search } from "lucide-react";
import { requireUser } from "@/lib/session";
import { canModerate, FORUM_CATEGORIES, isForumCategory } from "@/lib/forum-rules";
import { listForumTopics } from "@/lib/forum-store";
import { fieldClass, ForumDate, ForumPagination, ForumShell, panelClass, primaryClass, TopicMetrics } from "./ForumUi";
import { getForumPage } from "./query";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";

export const metadata = { title: "Fórum | Manual do NAO" };

export default async function ForumPage({ searchParams }) {
  const user = await requireUser("/forum");
  const filters = await searchParams;
  const category = isForumCategory(filters.categoria) ? filters.categoria : "";
  const search = typeof filters.q === "string" ? filters.q.trim().slice(0, 100) : "";
  const sort = filters.ordem === "atividade" ? "atividade" : "recentes";
  const hidden = canModerate(user.role) && filters.ocultos === "1";
  const page = getForumPage(filters.pagina);
  const { topics, hasMore } = await listForumTopics({ category, search, sort, hidden, page });

  function feedHref(nextPage = 1, showHidden = hidden) {
    const params = new URLSearchParams();
    if (category) params.set("categoria", category);
    if (search) params.set("q", search);
    if (sort === "atividade") params.set("ordem", sort);
    if (showHidden) params.set("ocultos", "1");
    if (nextPage > 1) params.set("pagina", nextPage);
    return params.size ? `/forum?${params}` : "/forum";
  }

  return (
    <ForumShell>
      <header className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-8 dark:border-sky-900 dark:from-sky-950 dark:to-neutral-900">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <MessageCircle size={27} aria-hidden="true" className="mb-3 text-sky-700 dark:text-sky-300" />
            <SplitText
              text="Comunidade NAO"
              tag="h1"
              delay={35}
              className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl dark:text-white"
            />
            <BlurText
              text="Compartilhe projetos e arquivos, faça perguntas e converse com outros participantes."
              tag="p"
              delay={30}
              className="mt-2 text-neutral-700 dark:text-neutral-300"
            />
          </div>
          <Link href="/forum/novo" className={primaryClass}><Plus size={19} aria-hidden="true" /> Nova publicação</Link>
        </div>
      </header>

      <div className={`${panelClass} p-4 sm:p-5`}>
        <form action="/forum" method="get" className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.65fr)_auto]" aria-label="Filtrar publicações">
          {hidden && <input type="hidden" name="ocultos" value="1" />}
          <div className="space-y-1">
            <label htmlFor="procurar" className="block text-sm font-bold">Buscar</label>
            <input className={fieldClass} type="search" name="q" id="procurar" maxLength={100} defaultValue={search} placeholder="Título ou texto" />
          </div>
          <div className="space-y-1">
            <label htmlFor="categoria" className="block text-sm font-bold">Categoria</label>
            <select className={fieldClass} name="categoria" id="categoria" defaultValue={category}>
              <option value="">Todas as categorias</option>
              {Object.entries(FORUM_CATEGORIES).map(([id, label]) => <option value={id} key={id}>{label}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="ordem" className="block text-sm font-bold">Ordenar por</label>
            <select className={fieldClass} name="ordem" id="ordem" defaultValue={sort}>
              <option value="recentes">Mais recentes</option>
              <option value="atividade">Atividade recente</option>
            </select>
          </div>
          <button className={`${primaryClass} min-h-11`} type="submit"><Search size={17} aria-hidden="true" /> Filtrar</button>
        </form>
        {(search || category || canModerate(user.role)) && (
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-sky-800 dark:text-sky-300">
            {(search || category) && <Link href={hidden ? "/forum?ocultos=1" : "/forum"} className="hover:underline">Limpar filtros</Link>}
            {canModerate(user.role) && <Link href={feedHref(1, !hidden)} className="hover:underline">{hidden ? "Ver publicações visíveis" : "Ver publicações ocultadas"}</Link>}
          </div>
        )}
      </div>

      <section aria-labelledby="feed-title" className="space-y-3">
        <h2 id="feed-title" className="text-xl font-extrabold text-neutral-900 dark:text-white">{hidden ? "Publicações ocultadas" : "Publicações"}</h2>
        {topics.length === 0 && (
          <div className={`${panelClass} p-6`}>
            <p className="text-neutral-700 dark:text-neutral-300">{search || category || page > 1 ? "Nenhuma publicação encontrada." : hidden ? "Nenhuma publicação foi ocultada." : "A comunidade ainda está começando. Publique a primeira pergunta ou compartilhe um projeto."}</p>
          </div>
        )}
        <ul className="forum-list space-y-3">
          {topics.map((topic) => (
            <li key={topic.id}>
              <article className={`${panelClass} space-y-2.5 p-4 sm:p-5`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="font-bold text-sky-800 dark:text-sky-300">{FORUM_CATEGORIES[topic.category]}</span>
                  <span className="break-words">{topic.author_name}</span>
                  <ForumDate value={topic.created_at} />
                  {topic.closed_at && <span className="font-semibold">Encerrada</span>}
                </div>
                <h3 className="break-words text-xl font-extrabold text-neutral-950 dark:text-white">
                  <Link href={`/forum/${topic.id}`} className="hover:text-sky-800 hover:underline dark:hover:text-sky-300">{topic.title}</Link>
                </h3>
                <p className="line-clamp-2 break-words text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{topic.preview}</p>
                <TopicMetrics topic={topic} />
              </article>
            </li>
          ))}
        </ul>
        <ForumPagination page={page} hasMore={hasMore} href={feedHref} />
      </section>
    </ForumShell>
  );
}
