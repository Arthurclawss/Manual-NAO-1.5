import {
  ArrowLeft,
  Building2,
  FlaskConical,
  Heart,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
  Users
} from 'lucide-react'

import nao from '../assets/nao.png'

const teamMembers = [
  {
    name: 'Integrante 01',
    role: 'Pesquisa e conteudo',
    initials: '01',
    tone: 'blue',
  },
  {
    name: 'Integrante 02',
    role: 'Desenvolvimento web',
    initials: '02',
    tone: 'teal',
  },
  {
    name: 'Integrante 03',
    role: 'Experiencia educacional',
    initials: '03',
    tone: 'violet',
  },
  {
    name: 'Integrante 04',
    role: 'Robotica educacional',
    initials: '04',
    tone: 'blue',
  },
  {
    name: 'Integrante 05',
    role: 'Design e interface',
    initials: '05',
    tone: 'teal',
  },
  {
    name: 'Integrante 06',
    role: 'Documentacao',
    initials: '06',
    tone: 'violet',
  },
  {
    name: 'Integrante 07',
    role: 'Testes e validacao',
    initials: '07',
    tone: 'blue',
  },
  {
    name: 'Integrante 08',
    role: 'Apoio pedagogico',
    initials: '08',
    tone: 'teal',
  },
]

const projectContexts = [
  {
    icon: <Building2 size={24} />,
    title: 'Instituicao',
    text: 'Universidade Federal de Tecnologia e Inovacao',
    detail: 'Apoio academico para aproximar robotica, ensino e tecnologia.',
    tone: 'blue',
  },
  {
    icon: <FlaskConical size={24} />,
    title: 'Laboratorio',
    text: 'Laboratorio de Robotica Aplicada a Educacao',
    detail: 'Espaco de pesquisa, testes com o NAO e criacao de experiencias educacionais.',
    tone: 'cyan',
  },
  {
    icon: <Users size={24} />,
    title: 'Comunidade',
    text: 'Estudantes, educadores e pesquisadores',
    detail: 'O manual foi pensado para quem esta dando os primeiros passos com robotica.',
    tone: 'purple',
  },
]

function Projeto({ darkMode, setDarkMode }) {
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

      <main className="project-page" id="conteudo-principal">
        <div className="project-container">
        <button
          className="back-button"
          type="button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

          <section className="project-hero">
            <div className="project-icon">
              <Heart size={32} />
            </div>

            <span className="project-kicker">Manual do Now</span>

            <h1>Quem esta por tras do projeto</h1>

            <p>
              Conheca os componentes, o laboratorio e o ambiente de pesquisa que
              ajudam a transformar o aprendizado com o NAO em uma experiencia mais
              acessivel.
            </p>
          </section>

          <section className="team-section" aria-labelledby="team-title">
            <div className="section-heading">
              <span>Componentes</span>
              <h2 id="team-title">Equipe do projeto</h2>
              <p>
                Cada pessoa contribui com uma parte da experiencia: pesquisa,
                desenvolvimento, organizacao do conteudo e olhar educacional.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <article className="member-card" key={member.name}>
                  <div className={`member-avatar ${member.tone}`}>
                    <span>{member.initials}</span>
                  </div>

                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="project-info" aria-label="Contexto do projeto">
            {projectContexts.map((item) => (
              <article className="project-box" key={item.title}>
                <div className={`project-box-icon ${item.tone}`}>
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span>{item.detail}</span>
                </div>
              </article>
            ))}
          </section>

          <section className="motivation-box">
            <h2>Por que esse manual existe?</h2>

            <p>
              O projeto nasceu para tornar o primeiro contato com o robo NAO mais
              claro, acolhedor e visual. Em vez de depender apenas de documentos
              tecnicos, o Manual do Now organiza explicacoes, capitulos e caminhos
              de aprendizagem para estudantes e educadores.
            </p>
          </section>

          <div className="thanks-box">
            <h3>Um projeto feito por pessoas, para pessoas.</h3>

            <p>
              A tecnologia fica mais interessante quando mostra quem pesquisa,
              ensina, testa e aprende junto.
            </p>
          </div>
        </div>

        <footer className="project-footer">
          <div>
            <strong>Creditos</strong>
            <span>Manual do Now - Equipe de Robotica Educacional</span>
          </div>

          <div>
            <strong>Contato</strong>
            <span><Mail size={15} /> contato@manualdonow.com</span>
            <span><Phone size={15} /> (00) 0000-0000</span>
          </div>

          <div>
            <strong>Endereco</strong>
            <span><MapPin size={15} /> Laboratorio de Robotica Aplicada a Educacao</span>
            <span>Campus Universitario - Cidade/UF</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Projeto
