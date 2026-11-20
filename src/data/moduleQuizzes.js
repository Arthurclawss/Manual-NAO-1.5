import { lessons } from './lessons.js'

export const QUIZ_PASS_SCORE = 7
export const QUIZ_TIMES = [45, 90]

const questions = {
  1: [
    ['Por que o NAO é chamado de humanoide?', 'Seu corpo lembra a forma humana.', 'Sua aparência depende do programa em execução.', 'Ele possui apenas uma interface por voz.'],
    ['Qual é o papel do NAOqi?', 'Oferecer serviços de software para recursos do robô.', 'Organizar as reservas do laboratório.', 'Guardar somente as instruções escritas do manual.'],
    ['Em uma saudação falada, qual elemento entrega a resposta ao público?', 'O alto-falante', 'A articulação do ombro', 'A conexão de rede'],
    ['Onde você procura instruções para carregar a bateria no guia?', 'Em primeiros passos ou uso diário', 'Na seção sobre canais', 'No guia de configuração de idioma'],
    ['A turma quer entender uma notificação de estado do NAO. Qual seção ajuda?', 'Entendimento', 'Aplicativos', 'Configuração de idioma'],
    ['Para criar um comportamento próprio, que ferramenta a aula apresenta?', 'Choregraphe', 'A loja de aplicativos', 'O painel de configuração da rede'],
    ['Você achou uma instrução antiga para o NAO. O que deve conferir antes de usá-la?', 'A versão do software e o modelo do laboratório', 'O número de alunos inscritos na atividade', 'A data em que o computador foi comprado'],
    ['Para localizar uma atividade pronta no guia, por onde começar?', 'Pela seção de aplicativos', 'Pelo guia de bateria', 'Pela seção de notificações de estado'],
    ['Qual roteiro separa bem a ação da pessoa da resposta do NAO?', 'A pessoa faz um sinal; o NAO diz “Olá, turma!”.', 'O NAO diz “Olá”; a equipe decide depois qual foi o sinal.', 'O grupo escolhe o idioma e considera a saudação encerrada.'],
  ],
  2: [
    ['O que vale confirmar antes de organizar o espaço da sessão?', 'Quem supervisiona e qual atividade será executada', 'A cor dos cartões da apresentação', 'A frase exata de despedida'],
    ['Qual método ajuda a identificar por que o NAO não foi encontrado?', 'Verificar uma condição por vez', 'Mudar todas as configurações de uma vez', 'Trocar o texto e a rede ao mesmo tempo'],
    ['A ferramenta já está conectada, mas a atividade age de forma inesperada. O que fazer?', 'Registrar o comportamento e conferir o estado com o responsável', 'Concluir que a bateria está descarregada', 'Trocar a rede sem registrar a falha'],
    ['Há um intervalo entre apresentações. Qual orientação consultar?', 'Como colocar o NAO em descanso', 'Como assinar um canal', 'Como mudar o idioma'],
    ['A equipe vai trocar de atividade com o robô ainda ligado. Que seção do guia procurar?', 'Como iniciar ou sair de uma atividade', 'Como registrar o equipamento', 'Como desligar o robô ao fim da sessão'],
    ['Quem pode ajudar a definir a rotina de carregamento depois da aula?', 'O responsável pelo equipamento', 'Quem escolheu o título do roteiro', 'Quem observa o público'],
    ['Qual lista cobre três necessidades da preparação?', 'Área livre, bateria conferida e conexão verificada', 'Título, cor dos cartões e nome da turma', 'Frase de abertura, despedida e aplausos'],
    ['Antes de avaliar a conexão, qual condição básica deve ser confirmada?', 'Se o NAO está ligado', 'Se a saudação foi ensaiada', 'Se o público já entrou na sala'],
    ['Ao encerrar o uso do equipamento, qual referência orienta a equipe?', 'O procedimento de desligamento e as orientações do laboratório', 'A página de aplicativos', 'A seção de revisão da saudação'],
  ],
  3: [
    ['Qual parte é um exemplo de articulação?', 'O cotovelo', 'O microfone', 'O alto-falante'],
    ['Que componente capta sons do ambiente?', 'O microfone', 'O alto-falante', 'O joelho'],
    ['Qual par ordena corretamente uma entrada e uma saída?', 'Microfone e alto-falante', 'Alto-falante e microfone', 'Cotovelo e ombro como entradas sonoras'],
    ['O que uma articulação permite observar no robô?', 'O movimento de uma parte em relação a outra', 'A escolha de uma palavra para a fala', 'A seleção da rede Wi-Fi'],
    ['Quando o NAO dobra o braço, qual ponto vale procurar no desenho?', 'O cotovelo', 'O alto-falante', 'A câmera frontal'],
    ['Qual fonte é a mais adequada para identificar componentes de uma versão específica?', 'O guia técnico daquele modelo', 'O roteiro da saudação', 'A lista de tópicos do fórum'],
    ['Em uma resposta do NAO por fala, o som captado antes da fala é o quê?', 'Uma entrada', 'Uma postura final', 'Uma saída sonora do robô'],
    ['Qual legenda explica uma relação entre duas partes do corpo?', 'O ombro permite que o braço se mova em relação ao tronco.', 'O microfone emite a fala quando o braço sobe.', 'O tronco capta a voz e o joelho reproduz o som.'],
    ['Qual cena mostra uma saída após uma entrada?', 'O NAO capta um som e reproduz uma mensagem.', 'A sala permanece em silêncio antes da aula.', 'A turma aponta o joelho em uma imagem.'],
  ],
  4: [
    ['Que quadro mostra de onde o movimento parte?', 'A postura inicial', 'A posição da plateia', 'A postura final'],
    ['O que é útil marcar nos três quadros do movimento?', 'As partes que se movem e onde a sequência termina', 'Somente o título do gesto', 'Somente a posição do público'],
    ['Por que observar o espaço ao redor do NAO no desenho?', 'Para identificar onde a trajetória pode cruzar a área das pessoas', 'Para escolher a fonte do cartaz', 'Para ajustar a velocidade da conexão'],
    ['Quem deve revisar a sequência antes de um teste físico?', 'O responsável pelo equipamento', 'A primeira pessoa que chegar à sala', 'A pessoa que escolheu a frase de abertura'],
    ['No exemplo do aceno, que quadro representa o gesto principal?', 'O quadro em que o braço está levantado', 'O quadro inicial com o braço junto ao corpo', 'O quadro final de retorno ao repouso'],
    ['Como verificar se seu desenho deixa claro o fim do aceno?', 'Pedir a alguém que explique o término só olhando a sequência', 'Ler em voz alta apenas o título', 'Apagar o último quadro e repetir o gesto'],
    ['O desenho mostra que o gesto passa perto da plateia. O que fazer antes do teste?', 'Rever o espaço e a trajetória com a equipe', 'Adicionar outra fala ao roteiro', 'Considerar que basta desenhar o primeiro quadro'],
    ['Qual é a finalidade de combinar uma forma de interromper o teste?', 'Permitir uma pausa clara se algo sair do previsto', 'Definir o nome do arquivo', 'Decidir quanto dura a introdução falada'],
    ['Que ordem representa a sequência ensaiada no papel?', 'Início, gesto principal, postura final', 'Gesto principal, fim, início', 'Postura final, posição do público, gesto principal'],
  ],
  5: [
    ['Ao planejar uma resposta por som, o que pode ser a entrada?', 'O som captado do ambiente', 'A fala emitida depois da decisão', 'A mensagem escrita ao fim da atividade'],
    ['Que etapa decide se o som é o sinal esperado?', 'A regra de reconhecimento do sinal', 'A resposta que será ouvida no fim', 'A posição da pessoa que observa'],
    ['A sala está barulhenta. Por que vale testar sons diferentes?', 'Porque diversos sons podem chegar à mesma entrada.', 'Porque o ruído escolhe automaticamente a resposta.', 'Porque a ausência do sinal deixa de ser possível.'],
    ['O sinal chega exatamente como previsto. O que o roteiro deve indicar?', 'A resposta que acontece em seguida', 'Apenas o nome da entrada', 'Uma lista de materiais sem relação com a interação'],
    ['Qual alternativa é adequada quando a pessoa não consegue emitir o sinal esperado?', 'Dar outra oportunidade ou encerrar a tentativa de forma clara', 'Executar qualquer ação sem avisar', 'Considerar o sinal reconhecido por padrão'],
    ['Que três rodadas a atividade propõe testar no papel?', 'Sinal certo, sinal diferente e silêncio', 'A mesma resposta três vezes', 'Três mensagens sem examinar nenhuma entrada'],
    ['Qual roteiro expressa uma decisão?', 'Se chegar o sinal combinado, começar; se não, esperar.', 'Começar antes de observar o sinal.', 'Escolher a resposta depois de encerrar a atividade.'],
    ['Em uma interação, o que vem depois de reconhecer o sinal?', 'A resposta definida para ele', 'O início da captação daquele mesmo sinal', 'A revisão do nome do projeto'],
    ['Na simulação em dupla, por que uma pessoa representa o robô?', 'Para verificar se a regra dá uma ação clara em cada rodada', 'Para medir a bateria do equipamento', 'Para substituir a definição do sinal no roteiro'],
  ],
  6: [
    ['Que instrução facilita a participação da turma?', 'Quando aparecer o cartão verde, faça o sinal combinado.', 'Faça todas as etapas assim que alguma coisa acontecer.', 'Decida sozinho quando começar depois da apresentação.'],
    ['Qual informação uma instrução precisa deixar clara?', 'O que fazer e em que momento', 'Quanto mede o cartaz utilizado', 'Qual arquivo guarda o desenho do robô'],
    ['Por que repetir o significado em um cartão ou legenda?', 'Para permitir que a pessoa entenda a instrução também pela visão', 'Para que cada canal indique uma tarefa diferente', 'Para evitar dizer quando a pessoa deve agir'],
    ['Que teste ajuda a avaliar se o cartão funciona?', 'Mostrar só o cartão e pedir que alguém explique a ação', 'Ler a instrução em voz alta enquanto a pessoa escreve o texto', 'Conferir somente o tamanho das letras de longe'],
    ['Em uma demonstração em equipe, quem pode apresentar o sinal visual?', 'Uma pessoa da equipe combinada no roteiro', 'Somente a pessoa que terá de responder', 'Apenas quem chegou por último à sala'],
    ['A frase é “Sua vez”. O que ajuda a indicar de quem é a vez?', 'Uma seta ou indicação visual de quem participa', 'A cor da capa que guarda o manual', 'Um sinal diferente a cada repetição, sem explicação'],
    ['Qual par mantém a mesma instrução nos dois canais?', 'Fala “Aguarde aqui” e cartão “Aguarde aqui”', 'Fala “Aguarde aqui” e cartão “Comece agora”', 'Fala “Comece agora” e cartão com instrução sobre outra etapa'],
    ['O que revisar se a pessoa entendeu a frase, mas começou no momento errado?', 'O momento indicado para agir', 'O nome do fabricante do robô', 'A ordem das páginas do guia técnico'],
    ['Qual opção reduz a carga de informação de uma saudação?', 'Dar uma instrução breve por vez', 'Dar todas as instruções futuras na saudação', 'Pedir para adivinhar o significado dos sinais'],
  ],
  7: [
    ['O que as ligações entre caixas mostram no Choregraphe?', 'A sequência em que as ações são acionadas', 'O idioma padrão de cada computador', 'O nome do responsável pelo laboratório'],
    ['Qual trecho tem início, ação e fim bem definidos?', 'Iniciar → dizer “Olá!” → encerrar', 'Dizer “Olá!” → aguardar início → repetir sem saída', 'Encerrar → definir o título → iniciar novamente'],
    ['O que fazer antes de passar um fluxo para um teste?', 'Acompanhar as setas e procurar etapas sem saída', 'Escolher cores para todas as caixas e encerrar o planejamento', 'Testar antes de definir onde o fluxo termina'],
    ['Qual elemento representa a fala no exemplo inicial do guia?', 'Uma caixa de fala', 'O título do projeto', 'Uma seta sem ligação'],
    ['O que registrar se o sinal combinado não chegar?', 'Um caminho alternativo que informa como esperar ou encerrar', 'Uma ligação para sempre repetir a mesma tentativa', 'Somente a frase que o NAO diria se o sinal chegasse'],
    ['Por que desenhar o fluxo no papel pode ajudar?', 'Porque permite revisar a ordem antes de executar', 'Porque substitui a escolha do ambiente adequado de teste', 'Porque confirma automaticamente que a conexão funciona'],
    ['Quem ajuda a escolher o ambiente adequado para o teste?', 'O responsável pelo equipamento', 'A primeira pessoa da plateia', 'Quem decide o título das caixas'],
    ['Qual dessas perguntas ajuda mais a revisar uma seta no diagrama?', 'Que passo deve acontecer depois deste?', 'Que cor será usada na impressão?', 'Quantos caracteres há no título?'],
    ['Uma caixa de saudação está isolada do início do fluxo. O que revisar?', 'A ligação que aciona a caixa', 'O idioma dos comentários do arquivo', 'A posição do título no documento'],
  ],
  8: [
    ['Quais papéis a equipe pode dividir na demonstração?', 'Apresentar, acompanhar o equipamento e observar o público', 'Todos apresentar e ninguém observar', 'Somente escolher o tema e falar juntos'],
    ['O que precisa ficar claro sobre a interrupção da atividade?', 'Quem pode sinalizar a pausa', 'Qual é o nome da apresentação', 'Qual é a ordem dos slides de boas-vindas'],
    ['O que conferir com o responsável antes de começar?', 'O espaço, a sequência e as condições de uso', 'Somente a imagem da capa do manual', 'Somente o horário em que o público vai sair'],
    ['Uma pessoa entra na área reservada durante a demonstração. O que o ensaio propõe?', 'Sinalizar a pausa e revisar o espaço antes de retomar', 'Manter a atividade enquanto a plateia reorganiza a área', 'Acelerar o roteiro para terminar logo'],
    ['Por que ensaiar também um cenário de pausa?', 'Para a equipe praticar o que fará se algo sair do previsto', 'Para dispensar a revisão do espaço no dia', 'Para trocar o tema durante a apresentação'],
    ['O que registrar após um comportamento inesperado?', 'O que a equipe observou e em que etapa aconteceu', 'Somente a data em que o roteiro foi escrito', 'Somente a duração total, sem citar o ocorrido'],
    ['Qual é uma evidência de que o plano foi bem compreendido?', 'Cada pessoa sabe como iniciar, acompanhar e pausar a atividade.', 'Apenas quem escreveu o plano entende as etapas.', 'Todos sabem o título, mas os papéis são escolhidos na hora.'],
    ['Em que momento a equipe deve discutir melhorias?', 'Depois de registrar o que aprendeu com o ensaio', 'Apenas antes de distribuir os papéis', 'Somente durante a fala de abertura'],
    ['Qual é a melhor forma de encerrar o ensaio no papel?', 'Anotar um ajuste para a próxima vez', 'Guardar o roteiro sem registrar observações', 'Apagar a condição de pausa'],
  ],
}

export const moduleQuizzes = Object.fromEntries(Object.entries(questions).map(([id, entries]) => {
  const [prompt, options, correct, explanation] = lessons[id].review
  return [id, [{ prompt, options, correct, explanation }, ...entries.map(([question, answer, ...distractors]) => ({
    prompt: question,
    options: [answer, ...distractors],
    correct: 0,
  }))]]
}))

export function scoreQuiz(quiz, answers) {
  if (!Array.isArray(answers) || answers.length !== quiz.length) return null
  return quiz.reduce((score, question, index) => score + Number(question.correct === answers[index]), 0)
}
