import {
  ArrowLeft,
  Eye,
  Image,
  Link,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Type,
  Video
} from 'lucide-react'

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  loadModules,
  resetModules,
  saveModules
} from '../data/moduleContent'

function Admin({ darkMode }) {
  const navigate = useNavigate()
  const [modules, setModules] = useState(() => loadModules())
  const [selectedId, setSelectedId] = useState(1)
  const [saved, setSaved] = useState(false)

  const selectedModule = useMemo(
    () => modules.find((module) => module.id === selectedId),
    [modules, selectedId]
  )

  function updateSelectedModule(field, value) {
    setSaved(false)
    setModules((currentModules) => currentModules.map((module) => (
      module.id === selectedId ? { ...module, [field]: value } : module
    )))
  }

  function updateSection(index, field, value) {
    setSaved(false)
    setModules((currentModules) => currentModules.map((module) => {
      if (module.id !== selectedId) {
        return module
      }

      const sections = module.sections.map((section, sectionIndex) => (
        sectionIndex === index ? { ...section, [field]: value } : section
      ))

      return { ...module, sections }
    }))
  }

  function addSection() {
    setSaved(false)
    updateSelectedModule('sections', [
      ...selectedModule.sections,
      {
        title: 'Nova secao',
        body: 'Escreva o conteudo desta secao.',
        blocks: [
          {
            type: 'text',
            text: 'Escreva o conteudo desta secao.',
          },
        ],
      },
    ])
  }

  function removeSection(index) {
    setSaved(false)
    updateSelectedModule(
      'sections',
      selectedModule.sections.filter((_, sectionIndex) => sectionIndex !== index)
    )
  }

  function addBlock(sectionIndex, type) {
    const newBlock = {
      text: { type: 'text', text: 'Novo bloco de texto.' },
      image: { type: 'image', url: '', alt: '', caption: '' },
      video: { type: 'video', url: '', title: '' },
      link: { type: 'link', url: '', label: 'Novo link', description: '' },
    }[type]

    setSaved(false)
    setModules((currentModules) => currentModules.map((module) => {
      if (module.id !== selectedId) {
        return module
      }

      const sections = module.sections.map((section, currentSectionIndex) => (
        currentSectionIndex === sectionIndex
          ? { ...section, blocks: [...section.blocks, newBlock] }
          : section
      ))

      return { ...module, sections }
    }))
  }

  function updateBlock(sectionIndex, blockIndex, field, value) {
    setSaved(false)
    setModules((currentModules) => currentModules.map((module) => {
      if (module.id !== selectedId) {
        return module
      }

      const sections = module.sections.map((section, currentSectionIndex) => {
        if (currentSectionIndex !== sectionIndex) {
          return section
        }

        return {
          ...section,
          blocks: section.blocks.map((block, currentBlockIndex) => (
            currentBlockIndex === blockIndex ? { ...block, [field]: value } : block
          )),
        }
      })

      return { ...module, sections }
    }))
  }

  function removeBlock(sectionIndex, blockIndex) {
    setSaved(false)
    setModules((currentModules) => currentModules.map((module) => {
      if (module.id !== selectedId) {
        return module
      }

      const sections = module.sections.map((section, currentSectionIndex) => (
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              blocks: section.blocks.filter((_, currentBlockIndex) => currentBlockIndex !== blockIndex),
            }
          : section
      ))

      return { ...module, sections }
    }))
  }

  function handleSave() {
    saveModules(modules)
    setSaved(true)
  }

  function handleReset() {
    const restoredModules = resetModules()
    setModules(restoredModules)
    setSelectedId(1)
    setSaved(false)
  }

  return (
    <div className={darkMode ? 'admin-page dark' : 'admin-page'} id="conteudo-principal">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="admin-sidebar-heading">
            <span>Administracao</span>
            <h1>Perfil administrativo</h1>
            <p>Gerencie textos, imagens, videos e links dos modulos sem mexer no codigo.</p>
          </div>

          <div className="admin-module-list">
            {modules.map((module) => (
              <button
                className={module.id === selectedId ? 'active' : ''}
                type="button"
                key={module.id}
                onClick={() => setSelectedId(module.id)}
              >
                <strong>{module.tag}</strong>
                <span>{module.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="admin-editor">
          <div className="admin-toolbar">
            <div>
              <span>Editando</span>
              <h2>{selectedModule.tag}</h2>
            </div>

            <div className="admin-actions">
              {saved && <p className="save-status">Alteracoes salvas</p>}

              <button type="button" className="ghost-action" onClick={() => navigate('/modulo1')}>
                <Eye size={18} />
                Ver modulo
              </button>

              <button type="button" className="ghost-action" onClick={handleReset}>
                <RotateCcw size={18} />
                Restaurar
              </button>

              <button type="button" onClick={handleSave}>
                <Save size={18} />
                Salvar
              </button>
            </div>
          </div>

          <section className="admin-card">
            <div className="admin-notice">
              Area reservada para administradores. No fluxo do aluno, esta tela nao aparece na dashboard.
            </div>

            <h3>Informacoes principais</h3>

            <label>
              Nome do modulo
              <input
                value={selectedModule.tag}
                onChange={(event) => updateSelectedModule('tag', event.target.value)}
              />
            </label>

            <label>
              Titulo
              <input
                value={selectedModule.title}
                onChange={(event) => updateSelectedModule('title', event.target.value)}
              />
            </label>

            <label>
              Resumo para a dashboard
              <textarea
                rows="3"
                value={selectedModule.summary}
                onChange={(event) => updateSelectedModule('summary', event.target.value)}
              />
            </label>

            <label>
              Introducao do modulo
              <textarea
                rows="7"
                value={selectedModule.intro}
                onChange={(event) => updateSelectedModule('intro', event.target.value)}
              />
            </label>
          </section>

          <section className="admin-card">
            <div className="admin-section-title">
              <div>
                <h3>Secoes do conteudo</h3>
                <p>Monte o conteudo com blocos de texto, imagem, video e link.</p>
              </div>

              <button type="button" onClick={addSection}>
                <Plus size={18} />
                Adicionar secao
              </button>
            </div>

            <div className="admin-section-list">
              {selectedModule.sections.map((section, index) => (
                <article className="admin-section-card" key={`${section.title}-${index}`}>
                  <div className="admin-section-card-header">
                    <strong>Secao {index + 1}</strong>

                    <button
                      type="button"
                      aria-label={`Remover secao ${index + 1}`}
                      onClick={() => removeSection(index)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <label>
                    Titulo da secao
                    <input
                      value={section.title}
                      onChange={(event) => updateSection(index, 'title', event.target.value)}
                    />
                  </label>

                  <div className="admin-block-toolbar">
                    <button type="button" onClick={() => addBlock(index, 'text')}>
                      <Type size={16} />
                      Texto
                    </button>

                    <button type="button" onClick={() => addBlock(index, 'image')}>
                      <Image size={16} />
                      Imagem
                    </button>

                    <button type="button" onClick={() => addBlock(index, 'video')}>
                      <Video size={16} />
                      Video
                    </button>

                    <button type="button" onClick={() => addBlock(index, 'link')}>
                      <Link size={16} />
                      Link
                    </button>
                  </div>

                  <div className="admin-block-list">
                    {section.blocks.map((block, blockIndex) => (
                      <div className="admin-content-block" key={`${block.type}-${blockIndex}`}>
                        <div className="admin-section-card-header">
                          <strong>{block.type}</strong>

                          <button
                            type="button"
                            aria-label={`Remover bloco ${blockIndex + 1}`}
                            onClick={() => removeBlock(index, blockIndex)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        {block.type === 'text' && (
                          <label>
                            Texto
                            <textarea
                              rows="7"
                              value={block.text}
                              onChange={(event) => updateBlock(index, blockIndex, 'text', event.target.value)}
                            />
                          </label>
                        )}

                        {block.type === 'image' && (
                          <>
                            <label>
                              URL da imagem
                              <input
                                value={block.url}
                                placeholder="https://..."
                                onChange={(event) => updateBlock(index, blockIndex, 'url', event.target.value)}
                              />
                            </label>

                            <label>
                              Texto alternativo
                              <input
                                value={block.alt}
                                placeholder="Descreva a imagem para leitores de tela"
                                onChange={(event) => updateBlock(index, blockIndex, 'alt', event.target.value)}
                              />
                            </label>

                            <label>
                              Legenda
                              <input
                                value={block.caption}
                                onChange={(event) => updateBlock(index, blockIndex, 'caption', event.target.value)}
                              />
                            </label>
                          </>
                        )}

                        {block.type === 'video' && (
                          <>
                            <label>
                              URL incorporavel do video
                              <input
                                value={block.url}
                                placeholder="https://www.youtube.com/embed/..."
                                onChange={(event) => updateBlock(index, blockIndex, 'url', event.target.value)}
                              />
                            </label>

                            <label>
                              Titulo do video
                              <input
                                value={block.title}
                                onChange={(event) => updateBlock(index, blockIndex, 'title', event.target.value)}
                              />
                            </label>
                          </>
                        )}

                        {block.type === 'link' && (
                          <>
                            <label>
                              URL
                              <input
                                value={block.url}
                                placeholder="https://..."
                                onChange={(event) => updateBlock(index, blockIndex, 'url', event.target.value)}
                              />
                            </label>

                            <label>
                              Texto do link
                              <input
                                value={block.label}
                                onChange={(event) => updateBlock(index, blockIndex, 'label', event.target.value)}
                              />
                            </label>

                            <label>
                              Descricao
                              <input
                                value={block.description}
                                onChange={(event) => updateBlock(index, blockIndex, 'description', event.target.value)}
                              />
                            </label>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Admin
