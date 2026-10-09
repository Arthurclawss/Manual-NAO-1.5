export const MODULE_STORAGE_KEY = 'manual-now-modules'

export const defaultModules = [
  {
    id: 1,
    tag: 'Modulo 1',
    title: 'O que e o NAO? - Visao geral e primeiros passos',
    summary: 'Historia, caracteristicas e primeiras capacidades do robo.',
    intro: 'Neste modulo, voce sera apresentado ao NAO, um dos robos humanoides mais iconicos do mundo, desenvolvido pela SoftBank Robotics.\n\nVamos entender como a documentacao oficial esta organizada para que voce saiba onde encontrar as informacoes essenciais para opera-lo com seguranca e eficiencia.',
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
    tag: 'Modulo 2',
    title: 'Operacao e Entendimento',
    summary: 'Como ligar, conectar e preparar o NAO para uso.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 160,
    icon: '02',
    sections: [],
  },
  {
    id: 3,
    tag: 'Modulo 3',
    title: 'Anatomia do NAO',
    summary: 'Sensores, corpo, juntas e componentes de interacao.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 180,
    icon: '03',
    sections: [],
  },
  {
    id: 4,
    tag: 'Modulo 4',
    title: 'Movimentacao e Postura',
    summary: 'Equilibrio, movimento e cuidado durante as atividades.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 180,
    icon: '04',
    sections: [],
  },
  {
    id: 5,
    tag: 'Modulo 5',
    title: 'Percepcao e Sentidos',
    summary: 'Como o NAO enxerga, escuta e percebe o ambiente.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 200,
    icon: '05',
    sections: [],
  },
  {
    id: 6,
    tag: 'Modulo 6',
    title: 'Comunicacao',
    summary: 'Fala, luzes, respostas e interacao social.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 220,
    icon: '06',
    sections: [],
  },
  {
    id: 7,
    tag: 'Modulo 7',
    title: 'Programacao do NAO',
    summary: 'Ferramentas, blocos logicos e primeiros comportamentos.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 260,
    icon: '07',
    sections: [],
  },
  {
    id: 8,
    tag: 'Modulo 8',
    title: 'Seguranca e Boas Praticas',
    summary: 'Cuidados para preservar o robo e trabalhar em equipe.',
    intro: 'Conteudo em preparacao.',
    status: 'Bloqueado',
    progress: 0,
    xp: 140,
    icon: '08',
    sections: [],
  },
]

function normalizeModules(modules) {
  return modules.map((module) => ({
    ...module,
    sections: module.sections.map((section) => ({
      ...section,
      blocks: section.blocks?.length
        ? section.blocks
        : [
            {
              type: 'text',
              text: section.body || '',
            },
          ],
    })),
  }))
}

export function loadModules() {
  try {
    const storedModules = window.localStorage.getItem(MODULE_STORAGE_KEY)
    return normalizeModules(storedModules ? JSON.parse(storedModules) : defaultModules)
  } catch {
    return normalizeModules(defaultModules)
  }
}

export function saveModules(modules) {
  window.localStorage.setItem(MODULE_STORAGE_KEY, JSON.stringify(modules))
}

export function resetModules() {
  window.localStorage.removeItem(MODULE_STORAGE_KEY)
  return defaultModules
}
