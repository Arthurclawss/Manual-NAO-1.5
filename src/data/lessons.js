const userGuide = 'https://doc.aldebaran.com/2-8/family/nao_user_guide/index.html'
const technicalGuide = 'https://doc.aldebaran.com/2-8/home_nao.html'
const choregraphe = 'https://doc.aldebaran.com/2-8/software/choregraphe/choregraphe_first_steps.html'

export const lessons = {
  1: {
    title: 'Conheça o NAO',
    summary: 'Descubra o que o robô pode fazer e onde encontrar ajuda para começar.',
    intro: 'Imagine que sua turma recebeu o NAO para uma demonstração. Que pergunta você faria antes de ligar o robô? Neste módulo, você vai construir um mapa para encontrar as respostas.',
    goal: 'Explicar o que é o NAO e escolher a parte certa do manual para cada dúvida.',
    topics: [
      ['Um robô com corpo e comportamento', 'O NAO é um robô humanoide desenvolvido para interagir e realizar atividades. Ele combina um corpo com articulações, sensores que captam sinais e recursos como fala e movimento.\n\nO NAOqi é a plataforma de software que oferece serviços para esses recursos. Pense numa saudação: alguém pode iniciar a atividade, o programa decide o que dizer e o alto-falante entrega a resposta.'],
      ['Onde buscar a resposta certa', 'O guia de usuário está organizado pela tarefa que você quer realizar.\n\n- Primeiros passos e uso diário: começar, carregar, iniciar ou sair de uma atividade.\n- Configurações: encontrar opções como rede Wi-Fi e idioma.\n- Entendimento: consultar estados, notificações e a Vida Autônoma.\n- Aplicativos: conhecer as opções de instalação e canais descritas no guia.'],
      ['Do aplicativo à sua ideia', 'O guia descreve tanto atividades que podem ser adicionadas ao robô quanto comportamentos que você pode criar com ferramentas como o Choregraphe. Ao consultar uma instrução, confira a versão do software e o modelo usados no laboratório. Os links deste manual apontam para a documentação 2.8.'],
    ],
    supplement: ['Quando procurar um aplicativo ou um canal', 'Se você procura uma atividade específica, consulte a parte do guia sobre aplicativos. Se precisa de um conjunto de recursos reunidos para o robô, consulte a seção de canais. O guia 2.8 descreve como recuperar aplicativos e como assinar um canal. Confira com o responsável o que está disponível no equipamento da turma.', ['Aplicativos e canais na documentação 2.8', 'https://doc.aldebaran.com/2-8/family/nao_user_guide/store_home_nao.html']],
    activity: ['Prepare a primeira demonstração', 'Pense em uma saudação curta para a turma.', ['Escreva o que a pessoa faz para começar.', 'Descreva como o NAO responderia.', 'Escolha a seção do guia que abriria se precisasse trocar o idioma.'], 'Uma pessoa sinaliza que está pronta, o NAO diz “Olá, turma!” e o grupo consulta Configurações para verificar o idioma.'],
    review: ['Você quer conferir como conectar o NAO ao Wi-Fi. Qual parte do guia consulta primeiro?', ['Uso diário', 'Configurações', 'Aplicativos'], 1, 'A configuração de Wi-Fi está na área de Configurações do guia de usuário.'],
    source: ['Guia de usuário do NAO', userGuide],
  },
  2: {
    title: 'Prepare o NAO para uma sessão',
    summary: 'Planeje a preparação do robô e saiba o que verificar antes da atividade.',
    intro: 'A turma já escolheu uma saudação. Agora imagine que o robô liga, mas a ferramenta não aparece conectada. Quais verificações fariam sentido antes de mexer nas configurações?',
    goal: 'Montar uma lista de preparação e distinguir energia, conexão e estado do robô.',
    topics: [
      ['Prepare o espaço e os materiais', 'Confirme quem acompanha o uso do equipamento, qual atividade será executada e onde ela acontece. Consulte o guia e o procedimento do laboratório para as verificações de energia e de bateria.'],
      ['Separe os problemas antes de agir', 'Verifique uma coisa por vez. Se a ferramenta não encontra o robô, anote se ele já está ligado e então confira a conexão prevista para aquele ambiente. Se a conexão funciona e a atividade se comporta de outro jeito, registre o que aconteceu e confira o estado do robô com o responsável.'],
    ],
    supplement: ['Planeje a pausa e o fim da sessão', 'Para uma pausa entre apresentações, consulte a orientação de colocar o NAO em descanso. Se a turma vai encerrar somente a atividade, o guia tem uma seção própria para sair dela. Quando for desligar o robô ao final da sessão, use a orientação de desligamento e siga o procedimento do laboratório. Combine com o responsável quando conferir a bateria e se o carregamento será feito antes da próxima aula.', ['Uso diário no guia do NAO', userGuide]],
    activity: ['Crie uma lista de preparação', 'Faça a simulação em dupla, no papel.', ['Liste três verificações antes de começar.', 'Anote o que observaria se a ferramenta não encontrasse o robô.', 'Indique quem confirmaria que a sessão está pronta.'], 'Uma lista pode incluir área livre, bateria conferida conforme o guia e conexão confirmada no ambiente de teste.'],
    review: ['O robô já está ligado e a ferramenta não consegue encontrá-lo. O que faz sentido conferir em seguida?', ['O texto da saudação', 'A rede e a conexão da ferramenta', 'A ordem das falas'], 1, 'A conexão é a hipótese diretamente relacionada ao problema observado.'],
    source: ['Uso diário e configurações', userGuide],
  },
  3: {
    title: 'Explore o corpo do NAO',
    summary: 'Relacione partes do corpo, articulações, sensores e saídas.',
    intro: 'O NAO vira a cabeça e fala com a turma. Em uma única cena, é possível reconhecer partes que captam sinais e outras que produzem uma resposta.',
    goal: 'Diferenciar uma articulação, um sensor e uma saída em uma atividade.',
    topics: [
      ['Comece pelo que você consegue observar', 'Em uma imagem do NAO, localize cabeça, tronco, braços e pernas. Ombros, cotovelos e joelhos são bons pontos de partida para entender como articulações permitem que uma parte se mova em relação à outra.'],
      ['Separe entrada e saída', 'Microfones captam sons, enquanto alto-falantes emitem sons. Essa diferença ajuda a descrever quem fornece o sinal e como o robô devolve uma resposta. Consulte o guia técnico do seu modelo quando precisar identificar componentes específicos.'],
    ],
    activity: ['Faça um mapa do robô', 'Observe uma imagem do NAO no manual.', ['Marque uma articulação no desenho.', 'Escolha uma entrada e uma saída.', 'Ligue as duas a uma ideia de interação.'], 'Entrada: som captado pelo microfone. Saída: uma mensagem reproduzida pelo alto-falante.'],
    review: ['Qual componente produz o som que a turma ouve?', ['Microfone', 'Cotovelo', 'Alto-falante'], 2, 'O alto-falante é uma saída. O microfone capta o som do ambiente.'],
    source: ['Documentação técnica do NAO', technicalGuide],
  },
  4: {
    title: 'Planeje um movimento',
    summary: 'Desenhe uma sequência de posturas antes de testar qualquer movimento.',
    intro: 'Um aceno parece simples até você precisar explicar onde começa, onde termina e o que acontece entre uma postura e outra.',
    goal: 'Descrever um movimento como uma sequência de posturas e prever o espaço de que ele precisa.',
    topics: [
      ['Desenhe três momentos', 'Comece com três quadros: postura inicial, momento principal e postura final. Marque quais partes se movem em cada quadro e onde a sequência deve parar.'],
      ['Inclua o ambiente no planejamento', 'Observe no desenho se a trajetória cruza a área onde alguém ficaria. Antes de qualquer teste físico, apresente a sequência ao responsável pelo equipamento e combine como interromper a demonstração.'],
    ],
    activity: ['Rascunhe um aceno', 'Descreva o gesto em um papel, como se fosse uma história em quadrinhos.', ['Desenhe as três posturas.', 'Indique o espaço livre ao redor do movimento.', 'Mostre o desenho a um colega e peça que ele explique quando o aceno termina.'], 'Braço junto ao corpo; braço levantado no quadro central; braço de volta à postura inicial no último quadro.'],
    review: ['O que ajuda mais a planejar um aceno antes do teste?', ['Desenhar o início, o gesto e o fim', 'Escolher a cor da sala', 'Treinar somente a última postura'], 0, 'A sequência inteira mostra por onde o movimento passa e como termina.'],
  },
  5: {
    title: 'Do sinal à resposta',
    summary: 'Entenda como uma interação começa e o que fazer quando o sinal falha.',
    intro: 'Você quer que o robô responda a um som. E se houver conversa na sala ou se ninguém emitir o sinal? Essas situações também fazem parte do projeto.',
    goal: 'Desenhar uma interação com entrada, decisão, resposta e alternativa.',
    topics: [
      ['Defina o que conta como sinal', 'Um sensor oferece uma entrada, como som ou contato. O comportamento precisa decidir quando essa entrada corresponde ao sinal esperado. Em um ambiente barulhento, diversos sons podem chegar à mesma entrada.'],
      ['Planeje o que acontece sem o sinal', 'Defina a resposta para duas situações. Quando o sinal é reconhecido, a atividade avança. Quando o sinal é incerto ou demora, o comportamento pode esperar, pedir outra tentativa ou encerrar a interação de forma clara.'],
    ],
    activity: ['Teste uma interação no papel', 'Peça a um colega para representar o robô e outro para fornecer os sinais.', ['Escolha um sinal e escreva o que acontece quando ele chega.', 'Experimente um sinal diferente e uma rodada em silêncio.', 'Compare as três respostas e ajuste a regra.'], 'Ao receber o sinal combinado, a atividade começa. Sem o sinal, a pessoa responsável pode oferecer uma nova tentativa.'],
    review: ['Qual caso também deve fazer parte do planejamento?', ['Só o sinal perfeito', 'A ausência do sinal esperado', 'Apenas o texto da resposta final'], 1, 'Planejar a ausência do sinal ajuda a evitar que a atividade fique sem um próximo passo.'],
  },
  6: {
    title: 'Crie uma conversa acessível',
    summary: 'Combine fala e sinais visuais para orientar quem participa da atividade.',
    intro: 'Em uma sala cheia, alguém ouve a saudação e outra pessoa percebe apenas o gesto. Como você faria as duas entenderem quando chegou a vez delas?',
    goal: 'Escrever uma interação clara com uma alternativa à fala.',
    topics: [
      ['Uma instrução por vez', 'Diga o que a pessoa pode fazer e em que momento. Escrever “Quando aparecer o cartão verde, faça o sinal combinado” torna o momento da ação mais claro do que uma sequência longa de instruções.'],
      ['Ofereça outra forma de acompanhar', 'Combine uma indicação falada com um cartão, legenda ou gesto que tenha o mesmo significado. Em uma primeira demonstração, conte com a ajuda da equipe para apresentar o sinal visual.'],
    ],
    activity: ['Escreva uma saudação em dois formatos', 'Imagine a mesma atividade com e sem som.', ['Escreva uma frase breve de boas-vindas.', 'Crie uma versão visual com a mesma instrução.', 'Peça que alguém leia só a versão visual e diga o que precisa fazer.'], 'Fala: “É sua vez”. Cartão: “Sua vez”, acompanhado de uma seta indicando quem participa.'],
    review: ['Qual sinal é uma alternativa direta a ouvir “É sua vez”?', ['Uma segunda fala mais longa', 'Um cartão com a mensagem “Sua vez”', 'Um toque sem significado combinado'], 1, 'Um cartão com a mesma mensagem permite entender a instrução sem ouvir o áudio.'],
  },
  7: {
    title: 'Programe a primeira interação',
    summary: 'Passe do roteiro para um fluxo simples com o Choregraphe.',
    intro: 'A saudação que começou no papel já tem um sinal, uma resposta e uma forma de terminar. Agora você pode representar essa sequência como um comportamento.',
    goal: 'Representar um comportamento com início, ação e condição de término.',
    topics: [
      ['Do roteiro ao diagrama', 'No Choregraphe, você pode combinar caixas em um diagrama de fluxo. No exemplo inicial do guia, o início do comportamento aciona uma caixa de fala. No seu roteiro, cada ligação deve deixar claro o que vem em seguida.'],
      ['Revise antes de executar', 'Leia o fluxo em voz alta e acompanhe as setas com o dedo para encontrar etapas sem saída. Compare o roteiro com o exemplo oficial e combine com o responsável qual ambiente é adequado para o teste.'],
    ],
    activity: ['Monte um fluxo de saudação', 'Use papel ou acompanhe o exemplo de fluxo no guia.', ['Faça um bloco para o início e outro para a saudação.', 'Ligue os blocos na ordem em que devem acontecer.', 'Desenhe o fim e escreva uma alternativa caso o sinal não chegue.'], 'Início → aguardar o sinal combinado → dizer “Olá, turma!” → fim. Sem sinal, encerrar a tentativa.'],
    review: ['No exemplo inicial do Choregraphe, o que faz a saudação começar?', ['O título do arquivo', 'A ligação do início à caixa de fala', 'A cor da caixa no diagrama'], 1, 'A ligação indica que o início do comportamento deve acionar a caixa de fala.'],
    source: ['Primeiros passos no Choregraphe', choregraphe],
  },
  8: {
    title: 'Prepare uma demonstração segura',
    summary: 'Reúna as decisões da trilha em um plano que a equipe possa revisar.',
    intro: 'Chegou a hora de apresentar a interação. Considere a atividade pronta quando a equipe souber como iniciar, acompanhar e interromper a demonstração.',
    goal: 'Elaborar um plano de demonstração com papéis, verificações e sinais de pausa.',
    topics: [
      ['Defina quem faz o quê', 'Escolha quem apresenta, quem acompanha o equipamento e quem observa a reação do público. Deixe claro quem decide quando pausar e quais orientações do laboratório valem para a sessão.'],
      ['Combine quando parar e o que registrar', 'Antes de começar, revise o espaço, a sequência e as condições de uso com o responsável. Se algo sair do esperado, a equipe pode interromper a demonstração e registrar o que observou para revisar o roteiro.'],
    ],
    activity: ['Faça um ensaio de dois minutos', 'Use o roteiro da saudação e represente a atividade em equipe, no papel.', ['Distribua os papéis e revise a lista de preparação.', 'Simule o cenário esperado e um cenário que exige pausa.', 'Anote uma melhoria para a próxima demonstração.'], 'Se alguém entrar na área reservada, a pessoa responsável sinaliza a pausa e a apresentação é retomada depois da revisão do espaço.'],
    review: ['Quando a equipe deve combinar as condições de pausa?', ['Antes da apresentação', 'Depois que surgir um imprevisto', 'Somente após encerrar a sessão'], 0, 'A combinação prévia ajuda toda a equipe a agir de forma coordenada.'],
    source: ['Cuidados e uso diário do NAO', userGuide],
  },
}
