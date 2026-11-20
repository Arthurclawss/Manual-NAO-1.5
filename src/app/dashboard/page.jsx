import { requireUser } from "@/lib/session";
import { listForumTopics } from "@/lib/forum-store";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const { name } = await requireUser("/dashboard");
  const { topics } = await listForumTopics({ limit: 3 });
  const forumTopics = topics.map(({ id, title, reply_count }) => ({ id, title, replies: Number(reply_count) }));
  return <Dashboard name={name} forumTopics={forumTopics} />;
}
