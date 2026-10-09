import {
  Accessibility,
  Captions,
  Eye,
  Focus,
  MessageCircle,
  Minus,
  Plus,
  Type,
  Volume2,
  X
} from 'lucide-react'

import { useState } from 'react'

const options = [
  {
    key: 'highContrast',
    icon: <Eye size={18} />,
    title: 'Alto contraste',
    description: 'Reforca cores, bordas e diferenca entre texto e fundo.',
  },
  {
    key: 'readingFocus',
    icon: <Focus size={18} />,
    title: 'Foco de leitura',
    description: 'Realca blocos de texto e reduz distracoes visuais.',
  },
  {
    key: 'readingRuler',
    icon: <Minus size={18} />,
    title: 'Regua de leitura',
    description: 'Adiciona uma faixa guia fixa para acompanhar linhas.',
  },
  {
    key: 'reduceMotion',
    icon: <Accessibility size={18} />,
    title: 'Reduzir movimento',
    description: 'Remove animacoes, transicoes e efeitos de hover.',
  },
  {
    key: 'screenReader',
    icon: <Volume2 size={18} />,
    title: 'Leitor de tela',
    description: 'Ativa avisos textuais e melhora a navegacao por teclado.',
  },
  {
    key: 'captions',
    icon: <Captions size={18} />,
    title: 'Legendas e transcricoes',
    description: 'Mostra suporte textual para conteudos sonoros ou visuais.',
  },
  {
    key: 'textOnly',
    icon: <MessageCircle size={18} />,
    title: 'Comunicacao por texto',
    description: 'Prioriza forum, respostas escritas e alternativas sem fala.',
  },
]

function AccessibilityPanel({ preferences, setPreferences }) {
  const [open, setOpen] = useState(false)
  const [vlibrasOpen, setVlibrasOpen] = useState(false)

  function togglePreference(key) {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  function resetPreferences() {
    setPreferences({
      textScale: 0,
      highContrast: false,
      readingFocus: false,
      readingRuler: false,
      rulerPosition: 'middle',
      reduceMotion: false,
      screenReader: false,
      captions: false,
      textOnly: false,
    })
  }

  function changeTextScale(nextScale) {
    setPreferences((current) => ({
      ...current,
      textScale: Math.min(3, Math.max(0, nextScale)),
    }))
  }

  function changeRulerPosition(position) {
    setPreferences((current) => ({
      ...current,
      readingRuler: true,
      rulerPosition: position,
    }))
  }

  return (
    <>
      <button
        className="accessibility-trigger"
        type="button"
        aria-label="Abrir painel de acessibilidade"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Accessibility size={22} />
      </button>

      {open && (
        <aside
          className="accessibility-panel"
          aria-labelledby="accessibility-title"
        >
          <div className="accessibility-panel-header">
            <div>
              <span>Preferencias</span>
              <h2 id="accessibility-title">Acessibilidade</h2>
            </div>

            <button
              type="button"
              aria-label="Fechar painel de acessibilidade"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="a11y-control-card">
            <div className="a11y-control-heading">
              <span className="a11y-option-icon"><Type size={18} /></span>

              <span>
                <strong>Texto ampliado</strong>
                <small>Escolha entre tres niveis de ampliacao.</small>
              </span>
            </div>

            <div className="a11y-stepper" aria-label="Nivel de ampliacao do texto">
              <button
                type="button"
                aria-label="Diminuir texto"
                onClick={() => changeTextScale(preferences.textScale - 1)}
              >
                <Minus size={16} />
              </button>

              <strong>{preferences.textScale === 0 ? 'Padrao' : `Nivel ${preferences.textScale}`}</strong>

              <button
                type="button"
                aria-label="Aumentar texto"
                onClick={() => changeTextScale(preferences.textScale + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="accessibility-options">
            {options.map((option) => (
              <button
                className={preferences[option.key] ? 'a11y-option active' : 'a11y-option'}
                type="button"
                key={option.key}
                aria-pressed={preferences[option.key]}
                onClick={() => togglePreference(option.key)}
              >
                <span className="a11y-option-icon">{option.icon}</span>

                <span>
                  <strong>{option.title}</strong>
                  <small>{option.description}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="a11y-control-card">
            <div className="a11y-control-heading">
              <span className="a11y-option-icon"><Minus size={18} /></span>

              <span>
                <strong>Posicao da regua</strong>
                <small>Use depois de ativar a regua de leitura.</small>
              </span>
            </div>

            <div className="a11y-segmented" aria-label="Posicao da regua de leitura">
              {['alto', 'meio', 'baixo'].map((label) => {
                const value = label === 'alto' ? 'top' : label === 'baixo' ? 'bottom' : 'middle'

                return (
                  <button
                    className={preferences.rulerPosition === value ? 'active' : ''}
                    type="button"
                    key={value}
                    aria-pressed={preferences.rulerPosition === value}
                    onClick={() => changeRulerPosition(value)}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            className="a11y-reset"
            type="button"
            onClick={resetPreferences}
          >
            Restaurar padrao
          </button>
        </aside>
      )}

      <div className="sr-live-region" aria-live="polite">
        {preferences.screenReader && 'Modo de suporte a leitor de tela ativado.'}
        {preferences.captions && 'Legendas e transcricoes ativadas.'}
        {preferences.textOnly && 'Comunicacao por texto ativada.'}
      </div>

      <button
        className="vlibras-avatar"
        type="button"
        aria-label="Abrir avatar VLibras"
        aria-expanded={vlibrasOpen}
        onClick={() => setVlibrasOpen(!vlibrasOpen)}
      >
        <span className="vlibras-head" />
        <strong>VLibras</strong>
      </button>

      {vlibrasOpen && (
        <aside className="vlibras-card" aria-label="Suporte em Libras">
          <strong>VLibras</strong>
          <p>
            Area reservada para integracao do avatar VLibras. Quando conectado,
            ele traduzira textos selecionados para Libras.
          </p>
        </aside>
      )}
    </>
  )
}

export default AccessibilityPanel
