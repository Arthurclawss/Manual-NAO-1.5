import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  Lock,
  MessageCircle,
  Moon,
  Play,
  Settings,
  Sparkles,
  Sun,
  Trophy,
  User
} from 'lucide-react'

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import nao from '../assets/nao.png'
import { loadModules } from '../data/moduleContent'

const forumTopics = [
  {
    title: 'Como organizar a primeira aula com o NAO?',
    meta: '12 respostas',
  },
  {
    title: 'Ideias de desafios para iniciantes',
    meta: '8 respostas',
  },
  {
    title: 'Duvidas sobre conexao e preparacao',
    meta: '5 respostas',
  },
]

function Dashboard({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const modules = useMemo(() => loadModules(), [])

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="navbar home-navbar">
        <div className="logo">
          <img src={nao} alt="NAO" />
          <span>Manual do NAO</span>
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

      <main className="game-dashboard" id="conteudo-principal">
        <section className="dashboard-hero">
          <div className="player-card">
            <div className="player-avatar">
              <img src={nao} alt="" />
            </div>

            <div>
              <span>Perfil</span>
              <h1>Explorador NAO</h1>
              <p>Nivel 1 - Primeiros passos</p>
            </div>

            <button type="button" aria-label="Abrir perfil">
              <User size={20} />
            </button>
          </div>

          <div className="journey-card">
            <span className="dashboard-kicker">Jornada gamificada</span>
            <h2>Seu manual agora e uma missao.</h2>
            <p>
              Complete modulos, acumule XP, participe do forum e desbloqueie
              novas etapas da trilha do NAO.
            </p>

            <div className="journey-actions">
              <button type="button" onClick={() => navigate('/modulo1')}>
                <Play size={18} />
                Continuar missao
              </button>

              <button type="button" className="ghost-action">
                <MessageCircle size={18} />
                Abrir forum
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-stats" aria-label="Resumo de progresso">
          <article>
            <Trophy size={22} />
            <span>Progresso</span>
            <strong>0%</strong>
            <div className="stat-bar"><span style={{ width: '0%' }} /></div>
          </article>

          <article>
            <Flame size={22} />
            <span>Sequencia</span>
            <strong>0 dias</strong>
            <small>Volte amanha para iniciar sua serie.</small>
          </article>

          <article>
            <Award size={22} />
            <span>XP acumulado</span>
            <strong>0 XP</strong>
            <small>Ganhe XP concluindo modulos.</small>
          </article>

          <article>
            <Sparkles size={22} />
            <span>Conquistas</span>
            <strong>0/8</strong>
            <small>Uma conquista por modulo.</small>
          </article>
        </section>

        <section className="dashboard-layout">
          <div className="mission-column">
            <div className="section-heading dashboard-heading">
              <span>Trilha do manual</span>
              <h2>Modulos em blocos de missao</h2>
              <p>
                Cada bloco representa uma etapa do aprendizado. O primeiro esta
                aberto; os outros entram como proximos desafios da jornada.
              </p>
            </div>

            <div className="module-quest-grid">
              {modules.map((module) => {
                const unlocked = module.status === 'Disponivel'

                return (
                  <article
                    className={unlocked ? 'quest-card unlocked' : 'quest-card locked'}
                    key={module.id}
                  >
                    <div className="quest-number">{module.icon}</div>

                    <div className="quest-content">
                      <div className="quest-meta">
                        <span>Modulo {module.id}</span>
                        <strong>{module.xp} XP</strong>
                      </div>

                      <h3>{module.title}</h3>
                      <p>{module.summary}</p>

                      <div className="quest-progress">
                        <span style={{ width: `${module.progress}%` }} />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!unlocked}
                      aria-label={
                        unlocked
                          ? `Abrir modulo ${module.id}: ${module.title}`
                          : `Modulo ${module.id} bloqueado: ${module.title}`
                      }
                      onClick={() => unlocked && navigate(module.route)}
                    >
                      {unlocked ? <ArrowRight size={18} /> : <Lock size={18} />}
                    </button>
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="community-column">
            <section className="side-panel">
              <div className="side-panel-title">
                <MessageCircle size={20} />
                <h2>Forum dos participantes</h2>
              </div>

              <div className="forum-list">
                {forumTopics.map((topic) => (
                  <article key={topic.title}>
                    <h3>{topic.title}</h3>
                    <span>{topic.meta}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="side-panel achievement-panel">
              <div className="side-panel-title">
                <CheckCircle2 size={20} />
                <h2>Proximas conquistas</h2>
              </div>

              <ul>
                <li>Primeiro acesso ao manual</li>
                <li>Concluir o modulo 1</li>
                <li>Publicar uma duvida no forum</li>
              </ul>
            </section>

            <section className="side-panel settings-panel">
              <div className="side-panel-title">
                <Settings size={20} />
                <h2>Preferencias</h2>
              </div>

              <button type="button" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? 'Usar modo claro' : 'Usar modo escuro'}
              </button>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
