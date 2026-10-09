import { ArrowLeft } from 'lucide-react'

import { useMemo } from 'react'

import { loadModules } from '../data/moduleContent'

function renderText(body) {
  const blocks = body.split('\n\n').filter(Boolean)

  return blocks.map((block) => {
    const lines = block.split('\n').filter(Boolean)
    const isList = lines.every((line) => line.trim().startsWith('- '))

    if (isList) {
      return (
        <ul key={block}>
          {lines.map((line) => (
            <li key={line}>{line.replace('- ', '')}</li>
          ))}
        </ul>
      )
    }

    return <p key={block}>{block}</p>
  })
}

function renderContentBlock(block, index) {
  if (block.type === 'image') {
    return (
      <figure className="module-media-card" key={`${block.type}-${index}`}>
        <img src={block.url} alt={block.alt || block.caption || ''} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    )
  }

  if (block.type === 'video') {
    return (
      <div className="module-video-card" key={`${block.type}-${index}`}>
        <div className="module-video-frame">
          <iframe
            src={block.url}
            title={block.title || 'Video do modulo'}
            allowFullScreen
          />
        </div>
        {block.title && <strong>{block.title}</strong>}
      </div>
    )
  }

  if (block.type === 'link') {
    return (
      <a
        className="module-link-card"
        href={block.url}
        target="_blank"
        rel="noreferrer"
        key={`${block.type}-${index}`}
      >
        <span>{block.label || block.url}</span>
        {block.description && <small>{block.description}</small>}
      </a>
    )
  }

  return (
    <div className="module-text-block" key={`${block.type}-${index}`}>
      {renderText(block.text || '')}
    </div>
  )
}

function Modulo1({ darkMode }) {
  const module = useMemo(() => loadModules().find((item) => item.id === 1), [])

  return (
    <div className={darkMode ? 'module-page dark' : 'module-page'} id="conteudo-principal">
      <div className="module-container">
        <button
          className="back-button"
          type="button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <span className="module-tag">{module.tag}</span>

        <h1>{module.title}</h1>

        <div className="module-intro">
          {renderText(module.intro)}
        </div>

        {module.sections.map((section) => (
          <section className="module-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.blocks.map((block, index) => renderContentBlock(block, index))}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Modulo1
