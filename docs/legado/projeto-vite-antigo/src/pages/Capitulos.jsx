import {
    BookOpen,
    ArrowLeft
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

function Capitulos({ darkMode, setDarkMode }) {

    const navigate = useNavigate()

    return (

        <div className={darkMode ? 'chapters-page dark' : 'chapters-page'} id="conteudo-principal">

            <div className="chapters-container">

                <button
                    className="back-button"
                    onClick={() => window.history.back()}
                >

                    <ArrowLeft size={18} />

                    Página principal

                </button>

                <div className="chapters-icon">

                    <BookOpen size={32} />

                </div>

                <h1>
                    Escolha um capítulo
                </h1>

                <p>
                    Selecione um capítulo para
                    iniciar sua jornada com o NAO.
                </p>

                <section className="chapters-list">

                    <div
                        className="chapter-card"
                        onClick={() => navigate('/dashboard')}
                    >

                        <span>
                            Capítulo 1
                        </span>

                        <h2>
                            Introdução ao NAO
                        </h2>

                        <p>
                            Conheça os primeiros conceitos
                            sobre o robô humanoide NAO.
                        </p>

                    </div>

                    <div className="chapter-card locked">

                        <span>
                            Capítulo 2
                        </span>

                        <h2>
                            Em breve
                        </h2>

                        <p>
                            Novos capítulos serão
                            adicionados futuramente.
                        </p>

                    </div>

                </section>

            </div>

        </div>

    )
}

export default Capitulos
