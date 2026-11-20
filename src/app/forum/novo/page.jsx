import { requireUser } from "@/lib/session";
import { TopicForm } from "../ForumForms";
import { ForumBackLink, ForumShell, panelClass } from "../ForumUi";

export const metadata = { title: "Nova publicação | Manual do NAO" };

export default async function NewTopicPage() {
  await requireUser("/forum/novo");

  return (
    <ForumShell narrow>
      <ForumBackLink />
      <section aria-labelledby="new-topic-title" className={`${panelClass} p-5 sm:p-8`}>
        <h1 id="new-topic-title" className="mb-6 text-3xl font-black tracking-tight text-neutral-950 dark:text-white">Nova publicação</h1>
        <TopicForm />
      </section>
    </ForumShell>
  );
}
