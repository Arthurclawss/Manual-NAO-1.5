"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  ImageIcon,
  LinkIcon,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Type,
  Video,
} from "lucide-react";
import { loadModules, resetModules, saveModules } from "@/data/moduleContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Admin() {
  const router = useRouter();
  const [modules, setModules] = useState(() => loadModules());
  const [selectedId, setSelectedId] = useState(1);
  const [saved, setSaved] = useState(false);

  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedId),
    [modules, selectedId]
  );

  function updateSelectedModule(field, value) {
    setSaved(false);
    setModules((cur) => cur.map((m) => (m.id === selectedId ? { ...m, [field]: value } : m)));
  }

  function updateSection(index, field, value) {
    setSaved(false);
    setModules((cur) =>
      cur.map((m) => {
        if (m.id !== selectedId) return m;
        const sections = m.sections.map((s, si) => (si === index ? { ...s, [field]: value } : s));
        return { ...m, sections };
      })
    );
  }

  function addSection() {
    setSaved(false);
    updateSelectedModule("sections", [
      ...selectedModule.sections,
      { title: "Nova seção", blocks: [{ type: "text", text: "Escreva o conteúdo desta seção." }] },
    ]);
  }

  function removeSection(index) {
    setSaved(false);
    updateSelectedModule("sections", selectedModule.sections.filter((_, si) => si !== index));
  }

  function addBlock(sectionIndex, type) {
    const newBlock = {
      text: { type: "text", text: "Novo bloco de texto." },
      image: { type: "image", url: "", alt: "", caption: "" },
      video: { type: "video", url: "", title: "" },
      link: { type: "link", url: "", label: "Novo link", description: "" },
    }[type];
    setSaved(false);
    setModules((cur) =>
      cur.map((m) => {
        if (m.id !== selectedId) return m;
        const sections = m.sections.map((s, si) =>
          si === sectionIndex ? { ...s, blocks: [...s.blocks, newBlock] } : s
        );
        return { ...m, sections };
      })
    );
  }

  function updateBlock(sectionIndex, blockIndex, field, value) {
    setSaved(false);
    setModules((cur) =>
      cur.map((m) => {
        if (m.id !== selectedId) return m;
        const sections = m.sections.map((s, si) => {
          if (si !== sectionIndex) return s;
          return { ...s, blocks: s.blocks.map((b, bi) => (bi === blockIndex ? { ...b, [field]: value } : b)) };
        });
        return { ...m, sections };
      })
    );
  }

  function removeBlock(sectionIndex, blockIndex) {
    setSaved(false);
    setModules((cur) =>
      cur.map((m) => {
        if (m.id !== selectedId) return m;
        const sections = m.sections.map((s, si) =>
          si === sectionIndex ? { ...s, blocks: s.blocks.filter((_, bi) => bi !== blockIndex) } : s
        );
        return { ...m, sections };
      })
    );
  }

  function handleSave() {
    saveModules(modules);
    setSaved(true);
  }

  function handleReset() {
    const restored = resetModules();
    setModules(restored);
    setSelectedId(1);
    setSaved(false);
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] bg-tech-grid">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 bg-white dark:bg-neutral-900/80 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-700/50 p-4 sm:p-6 flex flex-col gap-5 lg:gap-6 overflow-y-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Administração</span>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">Perfil administrativo</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Gerencie textos, imagens, vídeos e links dos módulos sem mexer no código.</p>
          </div>

          <div className="flex lg:block gap-2 lg:space-y-1.5 flex-1 overflow-x-auto pb-2 lg:pb-0">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`min-w-52 lg:min-w-0 lg:w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  m.id === selectedId
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <strong className="block font-semibold">{m.tag}</strong>
                <span className="text-xs">{m.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Editor */}
        <main id="conteudo-principal" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl mx-auto space-y-8">
            {/* Toolbar */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Editando</span>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{selectedModule.tag}</h2>
              </div>
              <div className="flex items-center gap-3">
                {saved && <span className="text-xs text-emerald-500 font-semibold">✓ Alterações salvas</span>}
                <button onClick={() => router.push("/modulo1")} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <Eye size={16} /> Ver módulo
                </button>
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <RotateCcw size={16} /> Restaurar
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all">
                  <Save size={16} /> Salvar
                </button>
              </div>
            </motion.div>

            {/* Notice */}
            <motion.div variants={fadeUp} custom={1} className="px-5 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-sm">
              Área reservada para administradores. No fluxo do aluno, esta tela não aparece na dashboard.
            </motion.div>

            {/* Main Info */}
            <motion.section variants={fadeUp} custom={2} className="p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 space-y-5">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Informações principais</h3>
              <div>
                <label className={labelClass}>Nome do módulo</label>
                <input className={inputClass} value={selectedModule.tag} onChange={(e) => updateSelectedModule("tag", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Título</label>
                <input className={inputClass} value={selectedModule.title} onChange={(e) => updateSelectedModule("title", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Resumo para a dashboard</label>
                <textarea className={inputClass} rows="3" value={selectedModule.summary} onChange={(e) => updateSelectedModule("summary", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Introdução do módulo</label>
                <textarea className={inputClass} rows="5" value={selectedModule.intro} onChange={(e) => updateSelectedModule("intro", e.target.value)} />
              </div>
            </motion.section>

            {/* Sections */}
            <motion.section variants={fadeUp} custom={3} className="p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Seções do conteúdo</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Monte o conteúdo com blocos de texto, imagem, vídeo e link.</p>
                </div>
                <button onClick={addSection} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                  <Plus size={16} /> Adicionar seção
                </button>
              </div>

              <div className="space-y-6">
                {selectedModule.sections.map((section, index) => (
                  <article key={`${section.title}-${index}`} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-700/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-neutral-700 dark:text-neutral-300">Seção {index + 1}</strong>
                      <button onClick={() => removeSection(index)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors" aria-label={`Remover seção ${index + 1}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div>
                      <label className={labelClass}>Título da seção</label>
                      <input className={inputClass} value={section.title} onChange={(e) => updateSection(index, "title", e.target.value)} />
                    </div>

                    {/* Block toolbar */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { type: "text", icon: <Type size={14} />, label: "Texto" },
                        { type: "image", icon: <ImageIcon size={14} />, label: "Imagem" },
                        { type: "video", icon: <Video size={14} />, label: "Vídeo" },
                        { type: "link", icon: <LinkIcon size={14} />, label: "Link" },
                      ].map((bt) => (
                        <button key={bt.type} onClick={() => addBlock(index, bt.type)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:border-emerald-400 transition-colors">
                          {bt.icon} {bt.label}
                        </button>
                      ))}
                    </div>

                    {/* Blocks */}
                    {section.blocks.map((block, bi) => (
                      <div key={`${block.type}-${bi}`} className="p-4 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{block.type}</span>
                          <button onClick={() => removeBlock(index, bi)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {block.type === "text" && (
                          <div>
                            <label className={labelClass}>Texto</label>
                            <textarea className={inputClass} rows="5" value={block.text} onChange={(e) => updateBlock(index, bi, "text", e.target.value)} />
                          </div>
                        )}
                        {block.type === "image" && (
                          <>
                            <div><label className={labelClass}>URL da imagem</label><input className={inputClass} value={block.url} placeholder="https://..." onChange={(e) => updateBlock(index, bi, "url", e.target.value)} /></div>
                            <div><label className={labelClass}>Texto alternativo</label><input className={inputClass} value={block.alt} onChange={(e) => updateBlock(index, bi, "alt", e.target.value)} /></div>
                            <div><label className={labelClass}>Legenda</label><input className={inputClass} value={block.caption} onChange={(e) => updateBlock(index, bi, "caption", e.target.value)} /></div>
                          </>
                        )}
                        {block.type === "video" && (
                          <>
                            <div><label className={labelClass}>URL incorporável do vídeo</label><input className={inputClass} value={block.url} placeholder="https://www.youtube.com/embed/..." onChange={(e) => updateBlock(index, bi, "url", e.target.value)} /></div>
                            <div><label className={labelClass}>Título do vídeo</label><input className={inputClass} value={block.title} onChange={(e) => updateBlock(index, bi, "title", e.target.value)} /></div>
                          </>
                        )}
                        {block.type === "link" && (
                          <>
                            <div><label className={labelClass}>URL</label><input className={inputClass} value={block.url} placeholder="https://..." onChange={(e) => updateBlock(index, bi, "url", e.target.value)} /></div>
                            <div><label className={labelClass}>Texto do link</label><input className={inputClass} value={block.label} onChange={(e) => updateBlock(index, bi, "label", e.target.value)} /></div>
                            <div><label className={labelClass}>Descrição</label><input className={inputClass} value={block.description} onChange={(e) => updateBlock(index, bi, "description", e.target.value)} /></div>
                          </>
                        )}
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
