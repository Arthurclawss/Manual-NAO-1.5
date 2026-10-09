"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { loadModules } from "@/data/moduleContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function renderText(body) {
  const blocks = body.split("\n\n").filter(Boolean);
  return blocks.map((block, idx) => {
    const lines = block.split("\n").filter(Boolean);
    const isList = lines.every((line) => line.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={idx} className="space-y-2 ml-1">
          {lines.map((line, li) => (
            <li key={li} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{line.replace("- ", "")}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {block}
      </p>
    );
  });
}

function renderContentBlock(block, index) {
  if (block.type === "image") {
    return (
      <figure key={`${block.type}-${index}`} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        {/* Dynamic administrator-provided URLs cannot be declared in Next image config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.url} alt={block.alt || block.caption || ""} className="w-full object-cover" />
        {block.caption && <figcaption className="p-3 text-sm text-center text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800">{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "video") {
    return (
      <div key={`${block.type}-${index}`} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <div className="aspect-video">
          <iframe src={block.url} title={block.title || "Vídeo do módulo"} allowFullScreen className="w-full h-full" />
        </div>
        {block.title && <strong className="block p-3 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800">{block.title}</strong>}
      </div>
    );
  }
  if (block.type === "link") {
    return (
      <a
        key={`${block.type}-${index}`}
        href={block.url}
        target="_blank"
        rel="noreferrer"
        className="block p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-400 transition-colors group"
      >
        <span className="text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline">{block.label || block.url}</span>
        {block.description && <small className="block text-xs text-neutral-500 dark:text-neutral-400 mt-1">{block.description}</small>}
      </a>
    );
  }
  return (
    <div key={`${block.type}-${index}`} className="space-y-3">
      {renderText(block.text || "")}
    </div>
  );
}

export default function Modulo1() {
  const courseModule = useMemo(() => loadModules().find((item) => item.id === 1), []);

  return (
    <main id="conteudo-principal" className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] bg-tech-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <motion.div initial="hidden" animate="visible" className="space-y-8">
          <motion.button
            variants={fadeUp}
            custom={0}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Voltar
          </motion.button>

          <motion.span
            variants={fadeUp}
            custom={1}
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-100 dark:border-emerald-500/20"
          >
            {courseModule.tag}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            custom={2}
            className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight"
          >
            {courseModule.title}
          </motion.h1>

          <motion.div variants={fadeUp} custom={3} className="space-y-3">
            {renderText(courseModule.intro)}
          </motion.div>

          {courseModule.sections.map((section, si) => (
            <motion.section
              key={section.title}
              variants={fadeUp}
              custom={si + 4}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 shadow-sm space-y-4"
            >
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white text-xs font-bold">
                  {si + 1}
                </span>
                {section.title}
              </h2>
              {section.blocks.map((block, bi) => renderContentBlock(block, bi))}
            </motion.section>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
