import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { useState } from 'react'

import AccessibilityPanel from './components/AccessibilityPanel'
import Admin from './pages/Admin'
import Modulo1 from './pages/Modulo1'

import Capitulos from './pages/Capitulos'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projeto from './pages/ProjetoTemp'

function App() {

  const [darkMode, setDarkMode] = useState(false)
  const [accessibility, setAccessibility] = useState({
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

  const accessibilityClassName = [
    'accessibility-shell',
    accessibility.textScale > 0 ? `a11y-text-scale-${accessibility.textScale}` : '',
    accessibility.highContrast ? 'a11y-high-contrast' : '',
    accessibility.readingFocus ? 'a11y-reading-focus' : '',
    accessibility.readingRuler ? 'a11y-reading-ruler' : '',
    accessibility.readingRuler ? `a11y-ruler-${accessibility.rulerPosition}` : '',
    accessibility.reduceMotion ? 'a11y-reduce-motion' : '',
    accessibility.screenReader ? 'a11y-screen-reader' : '',
    accessibility.captions ? 'a11y-captions' : '',
    accessibility.textOnly ? 'a11y-text-only' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={accessibilityClassName}>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteudo principal
      </a>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/projeto"
            element={
              <Projeto
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/capitulos"
            element={
              <Capitulos
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/modulo1"
            element={
              <Modulo1
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <Admin
                darkMode={darkMode}
              />
            }
          />

        </Routes>

      </BrowserRouter>

      <AccessibilityPanel
        preferences={accessibility}
        setPreferences={setAccessibility}
      />
    </div>
  )
}

export default App
