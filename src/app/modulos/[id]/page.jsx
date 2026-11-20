import { notFound, redirect } from "next/navigation";
import CourseModule from "@/components/CourseModule";
import { defaultModules } from "@/data/moduleContent";

export default async function ModulePage({ params }) {
  const { id } = await params;
  const lesson = defaultModules.find((item) => String(item.id) === id);
  if (!lesson) notFound();
  if (lesson.id === 1) redirect(lesson.route);
  return <CourseModule id={lesson.id} />;
}
