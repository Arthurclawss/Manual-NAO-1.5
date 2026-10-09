import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, LockKeyhole, LogIn, Moon, Sun } from 'lucide-react'

import nao from '../assets/nao.png'

function Home({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  function handleRobotMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = event.clientX - centerX
    const deltaY = event.clientY - centerY
    const angle = Math.atan2(deltaY, deltaX)
    const distance = Math.min(13, Math.hypot(deltaX, deltaY) / 12)

    setEyePosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    })
  }

  function resetRobotEyes() {
    setEyePosition({ x: 0, y: 0 })
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="navbar home-navbar">
        <div className="logo">
          <img src={nao} alt="NAO" />
          <span>Manual do Now</span>
        </div>

        <button
          className="theme-button"
          type="button"
          aria-label="Alternar tema"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="home-split" id="conteudo-principal">
        <section className="login-side" aria-labelledby="login-title">
          <div className="login-copy">
            <span className="login-badge">
              <LockKeyhole size={16} />
              Acesso seguro
            </span>

            <h1 id="login-title">Acesse o manual do NAO</h1>

            <p>
              Acesse seus capitulos, guias e informações sobre o Robô Humanoide
              NAO em uma experiencia simples e moderna.
            </p>
          </div>

          <div className="login-card-modern">
            <button
              className="google-login-button"
              type="button"
              onClick={() => navigate('/dashboard')}
            >
              <LogIn size={22} />
              Continuar com Google
            </button>

            <div className="login-divider">
              <span />
              <p>ou</p>
              <span />
            </div>


            <button
              className="project-login-button"
              type="button"
              onClick={() => navigate('/projeto')}
            >
              Conheça o nosso projeto
            </button>
          </div>
        </section>

        <section className="brand-side" aria-label="Apresentacao do Manual do Now">
          <div className="brand-panel">
            <div className="brand-mark" aria-hidden="true">
              <img src={nao} alt="" />
            </div>

            <div className="brand-copy">
              <p>Manual do Now</p>
              <h2>Conhecimento guiado para aprender com o NAO.</h2>
              <span>O NAO está de olho no seu próximo passo.</span>
            </div>

            <div
              className="ornal-face"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={resetRobotEyes}
              aria-label="Rosto interativo do robo NAO"
            >
              <div className="nao-head-top">
                <span />
              </div>

              <div className="ornal-screen">
                <div className="ornal-eye">
                  <span
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                  />
                </div>

                <div className="ornal-eye">
                  <span
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                  />
                </div>

                <div className="ornal-mouth" />
                <div className="nao-chin left" />
                <div className="nao-chin right" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
