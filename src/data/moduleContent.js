export const MODULE_STORAGE_KEY = 'manual-now-modules'

export const defaultModules = [
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
]

function normalizeModules(modules) {
  return modules.map((module) => ({
    ...module,
    sections: (module.sections || []).map((section) => ({
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
  return normalizeModules(defaultModules)
}
