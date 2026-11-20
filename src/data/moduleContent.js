import { lessons } from './lessons.js'

export const MODULE_STORAGE_KEY = 'manual-now-modules'
export const MODULE_STORAGE_EVENT = 'manual-now-modules-updated'

const introductoryLessons = {
  2: ['Preparar uma sessão', 'Antes de começar, identifique o responsável pelo equipamento, reserve espaço para a atividade e consulte o procedimento de preparação do laboratório.', 'Monte uma lista com o local, os materiais e as verificações que a equipe deve fazer antes de usar o NAO.'],
  3: ['Identificar componentes', 'Use a imagem do manual para localizar cabeça, tronco, braços e pernas. Observe onde há articulações e pense em quais movimentos cada parte permite.', 'Faça um desenho e indique as partes observadas. Escolha uma delas e explique sua função.'],
  4: ['Planejar movimentos', 'Descreva uma postura inicial, um movimento e uma postura final. Para uma demonstração em equipe, combine uma forma de interromper a atividade e mantenha a área livre.', 'Escreva a sequência de um aceno em três etapas. Discuta como o espaço ao redor muda o planejamento.'],
  5: ['Relacionar percepção e resposta', 'Em uma atividade interativa, separe o que o robô recebe do ambiente da ação que ele realiza em resposta. A mesma ação pode ser planejada para sinais diferentes.', 'Escolha um sinal, como um som ou uma imagem, e descreva a resposta que você espera. O que deve acontecer se o sinal não for reconhecido?'],
  6: ['Planejar uma interação', 'Uma interação tem uma mensagem, um público e um momento para a resposta. Escolha um canal coerente com a atividade, como fala, gestos ou sinais visuais.', 'Escreva uma saudação curta. Depois, desenhe uma versão da mesma interação que possa ser entendida sem áudio.'],
  7: ['Dividir um comportamento em etapas', 'Organize um comportamento em entrada, decisão e ação. Antes de testar no robô, revise a sequência no papel ou no ambiente de programação usado pela equipe.', 'Descreva em pseudocódigo uma saudação que só aconteça após um sinal. Inclua o que fazer quando o sinal não chegar.'],
  8: ['Revisar uma atividade antes de executar', 'Combine quem acompanha a atividade e como interrompê-la. Revise o espaço, a sequência e as orientações do responsável pelo equipamento.', 'Prepare uma lista de verificação para uma das atividades anteriores e revise a lista com outra pessoa.'],
}

const previousModules = [
  {
    id: 1,
    tag: 'Módulo 1',
    title: 'O que é o NAO? - Visão geral e primeiros passos',
    summary: 'História, características e primeiras capacidades do robô.',
    intro: 'Neste módulo, você será apresentado ao NAO, um dos robôs humanoides mais icônicos do mundo, desenvolvido pela SoftBank Robotics.\n\nVamos entender como a documentação oficial está organizada para que você saiba onde encontrar as informações essenciais para operá-lo com segurança e eficiência.',
    status: 'Disponivel',
    progress: 0,
    xp: 120,
    route: '/modulo1',
    icon: '01',
    sections: [
      {
        title: 'O conceito do NAO',
        body: 'O NAO e um robo humanoide projetado para interagir com pessoas e executar diversas atividades.\n\nEle funciona atraves de um sistema operacional especializado chamado NAOqi, que gerencia desde seus movimentos ate sua inteligencia artificial.\n\nAtualmente, a documentacao destaca as funcionalidades da versao 2.8 do sistema.',
        blocks: [
          {
            type: 'text',
            text: 'O NAO e um robo humanoide projetado para interagir com pessoas e executar diversas atividades.\n\nEle funciona atraves de um sistema operacional especializado chamado NAOqi, que gerencia desde seus movimentos ate sua inteligencia artificial.\n\nAtualmente, a documentacao destaca as funcionalidades da versao 2.8 do sistema.',
          },
        ],
      },
      {
        title: 'Organizacao da documentacao',
        body: 'Para facilitar o aprendizado, o guia do usuario divide o conhecimento em pilares fundamentais:\n\n- Primeiros Passos: o basico para comecar a jornada com o robo.\n- Uso Diario: procedimentos como ligar, carregar a bateria e colocar o robo em modo de descanso.\n- Configuracoes: ajustes de conexao Wi-Fi, idioma e atualizacoes.\n- Entendimento: detalhes tecnicos sobre comportamento, luzes e Vida Autonoma.',
        blocks: [
          {
            type: 'text',
            text: 'Para facilitar o aprendizado, o guia do usuario divide o conhecimento em pilares fundamentais:\n\n- Primeiros Passos: o basico para comecar a jornada com o robo.\n- Uso Diario: procedimentos como ligar, carregar a bateria e colocar o robo em modo de descanso.\n- Configuracoes: ajustes de conexao Wi-Fi, idioma e atualizacoes.\n- Entendimento: detalhes tecnicos sobre comportamento, luzes e Vida Autonoma.',
          },
        ],
      },
      {
        title: 'O ecossistema de aplicativos',
        body: 'Assim como um smartphone, o NAO possui uma App Store.\n\nAtraves dela, e possivel baixar novas atividades e inscrever o robo em canais de conteudo, permitindo que ele aprenda novos comportamentos.',
        blocks: [
          {
            type: 'text',
            text: 'Assim como um smartphone, o NAO possui uma App Store.\n\nAtraves dela, e possivel baixar novas atividades e inscrever o robo em canais de conteudo, permitindo que ele aprenda novos comportamentos.',
          },
        ],
      },
      {
        title: 'Resumo rapido',
        body: '- O NAO e um robo humanoide da SoftBank Robotics.\n- O sistema operacional do robo e o NAOqi.\n- O uso diario envolve ligar, carregar e gerenciar a Vida Autonoma.\n- O robo pode ser personalizado atraves da App Store.',
        blocks: [
          {
            type: 'text',
            text: '- O NAO e um robo humanoide da SoftBank Robotics.\n- O sistema operacional do robo e o NAOqi.\n- O uso diario envolve ligar, carregar e gerenciar a Vida Autonoma.\n- O robo pode ser personalizado atraves da App Store.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    tag: 'Módulo 2',
    title: 'Operação e Entendimento',
    summary: 'Como ligar, conectar e preparar o NAO para uso.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 160,
    icon: '02',
    sections: [],
  },
  {
    id: 3,
    tag: 'Módulo 3',
    title: 'Anatomia do NAO',
    summary: 'Sensores, corpo, juntas e componentes de interação.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 180,
    icon: '03',
    sections: [],
  },
  {
    id: 4,
    tag: 'Módulo 4',
    title: 'Movimentação e Postura',
    summary: 'Equilíbrio, movimento e cuidado durante as atividades.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 180,
    icon: '04',
    sections: [],
  },
  {
    id: 5,
    tag: 'Módulo 5',
    title: 'Percepção e Sentidos',
    summary: 'Como o NAO enxerga, escuta e percebe o ambiente.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 200,
    icon: '05',
    sections: [],
  },
  {
    id: 6,
    tag: 'Módulo 6',
    title: 'Comunicação',
    summary: 'Fala, luzes, respostas e interação social.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 220,
    icon: '06',
    sections: [],
  },
  {
    id: 7,
    tag: 'Módulo 7',
    title: 'Programação do NAO',
    summary: 'Ferramentas, blocos lógicos e primeiros comportamentos.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 260,
    icon: '07',
    sections: [],
  },
  {
    id: 8,
    tag: 'Módulo 8',
    title: 'Segurança e Boas Práticas',
    summary: 'Cuidados para preservar o robô e trabalhar em equipe.',
    intro: 'Conteúdo em preparação.',
    status: 'Bloqueado',
    progress: 0,
    xp: 140,
    icon: '08',
    sections: [],
  },
].map((module) => {
  const lesson = introductoryLessons[module.id]
  if (!lesson) return module

  const [title, intro, activity] = lesson
  return {
    ...module,
    route: `/modulos/${module.id}`,
    intro,
    sections: [{ title, blocks: [{ type: 'text', text: activity }] }],
  }
})

export const defaultModules = previousModules.map((previous) => {
  const { title, summary, intro, topics, supplement } = lessons[previous.id]
  return {
    ...previous,
    title,
    summary,
    intro,
    sections: [...topics, ...(supplement ? [supplement] : [])].map(([heading, text, reference]) => ({
      title: heading,
      blocks: reference
        ? [{ type: 'text', text }, { type: 'link', label: reference[0], url: reference[1] }]
        : [{ type: 'text', text }],
    })),
  }
})

function normalizeSections(sections = []) {
  return sections.map((section) => ({
    ...section,
    blocks: section.blocks?.length
      ? section.blocks
      : [{ type: 'text', text: section.body || '' }],
  }))
}

function withoutAccents(text) {
  return text.normalize('NFD').replace(/\p{Mark}/gu, '')
}

function normalizeModules(modules) {
  const saved = new Map(modules.map((module) => [module.id, module]))
  return defaultModules.map((defaults, index) => {
    const stored = saved.get(defaults.id)
    const previous = previousModules[index]
    const lesson = { ...defaults, ...stored, route: defaults.route }
    for (const field of ['tag', 'title', 'summary', 'intro']) {
      if (typeof stored?.[field] === 'string' && withoutAccents(stored[field]) === withoutAccents(previous[field])) {
        lesson[field] = defaults[field]
      }
    }
    const sections = normalizeSections(lesson.sections || [])
    const isPlaceholder = typeof stored?.intro === 'string' && withoutAccents(stored.intro) === 'Conteudo em preparacao.' && sections.length === 0
    if (isPlaceholder) lesson.intro = defaults.intro
    const sectionSnapshot = JSON.stringify(sections)
    const hasFormerLesson = lessons[defaults.id].supplement && sectionSnapshot === JSON.stringify(defaults.sections.slice(0, -1))
    if (isPlaceholder || hasFormerLesson || sectionSnapshot === JSON.stringify(normalizeSections(previous.sections))) {
      return { ...lesson, sections: defaults.sections }
    }
    return { ...lesson, sections }
  })
}

const initialModules = normalizeModules(defaultModules)
let cachedStorage = null
let cachedModules = initialModules

export function getInitialModules() {
  return initialModules
}

export function loadModules() {
  try {
    const storedModules = window.localStorage.getItem(MODULE_STORAGE_KEY)
    if (storedModules === cachedStorage) return cachedModules

    cachedModules = storedModules ? normalizeModules(JSON.parse(storedModules)) : initialModules
    cachedStorage = storedModules
    return cachedModules
  } catch {
    return initialModules
  }
}

export function saveModules(modules) {
  window.localStorage.setItem(MODULE_STORAGE_KEY, JSON.stringify(modules))
  window.dispatchEvent(new Event(MODULE_STORAGE_EVENT))
}

export function resetModules() {
  window.localStorage.removeItem(MODULE_STORAGE_KEY)
  window.dispatchEvent(new Event(MODULE_STORAGE_EVENT))
  return initialModules
}

export function isModuleCompleted(module) {
  return (module?.progress || 0) >= 100
}

export function getModulePrerequisite(modules, id) {
  return modules.find((module) => module.id < id && !isModuleCompleted(module))
}

export function getCurrentModule(modules) {
  return modules.find((module) => !isModuleCompleted(module)) || modules.at(-1)
}
