<h1> Terceira Sprint </h1>

<h2> Índice </h2>

- [Valor da Sprint](#valor)
- [DoR (Definition of Ready)](#dor)
- [DoD (Definition of Done)](#dod)
- [Sprint Backlog](#backlog)
- [Burndown](#burndown)
- [Tasks](#tasks)
- [Vídeo do produto](#video)
  
<br>

<h2> Valor da Sprint</h2><a name="valor"></a>

Criação de funcionalidades principais da aplicação.

<br>

<h2> DoR (Definition of Ready) </h2><a name="dor"></a>

### Sprint 2

- Criação das telas  ✔

- Sistema de cadastro ✔

- Sistema de login ✔

- Sistema de autenticação ✔

- Sistema de dados ✔

- Planejamento para a sprint ✔

<br>

<h2> DoD (Definition of Done) </h2><a name="dod"></a>

### Sprint 3

- Criação de chamado ✔

- Visualização de chamados (Cliente) ✔

- Visualização de chamados (Atendente) ✔

- Visualização de chamados (Administrador) ✔

- Atendendimento ao chamado (Atendente) ✔

- Encerramento do chamado (Atendente) ✔

- Criação de categorias ✔

- Definição de tempo de resposta de cada categoria ✔

- Visualização de categorias ✔

- Escolha de categorias ✔

- Visualização de prioridade (Funcionários) ✔

- Visualização de status do chamado ✔

- Comunicação por chat (Cliente & Atendente) ✔

- Escolha de categorias ✔

- Cadastro de perguntas frequentes (FAQs) ✔

- Edição de perguntas frequentes (FAQs) ✔

- Visualização de perguntas frequentes (FAQs) ✔

- Aumento automático da prioridade baseado em tempo de resposta (SLA) ✔

<br>

<h2> Sprint Backlog </h2> <a name="backlog"></a>

| Rank | Prioridade | Tarefa | Estimativa |
| --- | --- | --- | --- |
| 1 | Alta | Criação de chamado | 20 horas |
| 2 | Alta | Visualização dos chamados | 15 horas |
| 3 | Alta | Criação de categorias | 13 horas |
| 4 | Alta | Edição de categorias | 04 horas |
| 5 | Alta | Visualização de categorias | 09 horas |
| 6 | Alta | Iniciar atendimento | 06 horas |
| 7 | Alta | Encerrar atendimento | 04 horas |
| 8 | Alta | Chat de atendimento | 15 horas |
| 9 | Alta | Visualização de prioridade | 06 horas |
| 10 | Alta | Visualização de status | 07 horas |
| 11 | Média | Atualização automática da prioridade (SLA) | 08 horas |
| 12 | Média | Desativar conta de cliente | 08 horas |
| 13 | Média | Desativar conta de funcionário | 06 horas |
| 14 | Baixa | Cadastro de FAQs | 05 horas |
| 15 | Baixa| Edição de FAQs | 02 horas |
| 16 | Baixa | Visualização de FAQs| 07 horas |

<br>

<h2> Burndown Chart </h2><a name="burndown">

![Burndown sprint 3](/src/docs/burndownsprint3.png)

<br>

<h2> Tarefas </h2><a name="tasks"></a>

### User Story 8:

- Tarefa: Como cliente, desejo selecionar um categoria em que se encaixa o meu problema para realizar o atendimento de forma mais específica.

  - Critério de Aceitação:

     - O sistema deve apresentar uma lista de categorias relevantes que representam os problemas comuns dos clientes.
     - O cliente deve poder selecionar um categoria que melhor descreva seu problema da lista fornecida.
     - Após selecionar o categoria, o cliente deve ter a opção de descrever o problema em um campo de texto caso necessario.
     - Após descrever o problema, o cliente deve poder enviar as informações para iniciar o atendimento.
     - O sistema deve registrar o categoria selecionado e a descrição do problema enviada pelo cliente para referência futura.

  - Cenários:

     - O cliente acessa a página de atendimento ou de abertura de chamados.
     - Visualiza a lista de tópicos relevantes apresentados pelo sistema.
     - Seleciona um categoria que corresponda ao seu problema.
     - Após selecionar o categoria, é apresentado um campo de texto para descrever detalhadamente o problema.
     - O cliente descreve seu problema no campo fornecido.
     - Clica no botão de enviar para submeter o problema ao sistema.
     - O sistema registra o categoria selecionada e a descrição do problema associada ao cliente.
     - O cliente verifica se o problema foi submetido corretamente recebendo uma confirmação de envio.

### User Story 9:

- Tarefa: Como cliente, desejo visualizar todos os meus chamados abertos e seus status.

  - Critérios de Aceitação:

     - O sistema deve fornecer uma seção de tickets onde o cliente possa escolher entre visualizar os chamados ativos, todos os chamados e criar um novo chamado.
     - Para cada chamado ativo, o sistema deve exibir seu número de identificação, título e status atual.
     - Os chamados ativos devem estar disponíveis em uma página separada dos chamados fechados.
     - O cliente deve poder acessar a página de chamados fechados para visualizar o histórico completo quando necessário.
     - O sistema deve permitir ao cliente alternar facilmente entre as páginas de chamados ativos e fechados.
     - O cliente deve poder atualizar a página ou solicitar uma atualização para ver o status mais recente de seus chamados ativos.

  - Cenários:

     - O cliente faz login na sua conta.
     - Navega até a seção de tickets.
     - Na seção de tickets, o cliente pode escolher entre três opções: "Tickets Ativos", "Todos os Tickets" e "Criar Novo Ticket".
     - O cliente seleciona "Tickets Ativos".
     - Visualiza uma lista de todos os seus chamados ativos, incluindo o número de identificação, título e status atual de cada um.
     - Se necessário, o cliente pode entrar no chat.
     - O cliente pode acessar a página de chamados fechados para visualizar o histórico completo quando desejar.
     - O cliente pode alternar facilmente entre as páginas de chamados ativos e fechados.

### User Story 10:

- Tarefa: Como atendente, desejo visualizar os chamados que não foram resolvidos por ordem de prioridade para solucioná-los mais rapidamente.

  - Critérios de Aceitação:

     - O sistema deve fornecer uma seção onde o atendente possa visualizar os chamados não resolvidos.
     - Os chamados não resolvidos devem ser ordenados por ordem de prioridade, com os mais prioritários exibidos primeiro.
     - Para cada chamado não resolvido, o sistema deve exibir seu número de identificação, título, prioridade e status atual.
     - O atendente deve poder acessar cada chamado não resolvido para ver mais detalhes e tomar ações necessárias para resolvê-lo.
     - O sistema deve permitir ao atendente atualizar a página ou solicitar uma atualização para ver os chamados não resolvidos mais recentes.

  - Cenário:

     - O atendente faz login na sua conta.
     - Navega até a seção de chamados não resolvidos.
     - Visualiza uma lista de chamados não resolvidos, ordenados por prioridade.
     - Para cada chamado, verifica o número de identificação, título, prioridade e status atual.
     - Clica em um chamado para ver mais detalhes e tomar ações necessárias para resolvê-lo.

### User Story 11:

- Tarefa: Como atendente, desejo visualizar os atendimentos realizados por mim e seus status.

  - Critério de Aceitação:

     - O sistema deve fornecer uma seção onde o atendente possa visualizar os atendimentos realizados por ele.
     - Para cada atendimento realizado pelo atendente, o sistema deve exibir seu número de identificação, título e status atual.
     - Os atendimentos realizados pelo atendente devem ser apresentados de forma clara e organizada, permitindo identificar facilmente cada um.
     - O atendente deve poder acessar cada atendimento para ver mais detalhes, se necessário.

  - Cenário:

     - O atendente faz login na sua conta.
     - Navega até a seção de histórico de atendimento.
     - Visualiza uma lista de atendimentos realizados por ele, incluindo o número de identificação, título e status atual de cada um.

### User Story 12:

- Tarefa: Como cliente, quero abrir um chat para me comunicar com o atendente.

  - Critério de Aceitação:

     - O sistema deve possuir uma interface em que o cliente possa se comunicar com o atendente de forma clara.

  - Cenário:

     - O cliente faz login.
     - O cliente entra em um chamado que esta aberto.
     - Encontra a opção de entrar no chat.
     - Visualiza a reposta do atendente.
     - Se ele precisar de mais assistência ou tiver outras duvidas ele pode continuar a conversa com o atendente.

### User Story 13:

- Tarefa: Como atendente, quero abrir um chat para me comunicar com o cliente.

  - Critério de Aceitação:

     - O sistema deve possuir uma interface clara que permita ao atendente abrir um chat com o cliente de forma direta para solucionar o problema.
     - Deve haver uma opção para o atendente encerrar o chat quando a comunicação for concluída.

  - Cenário:

     - O atendente faz login na sua conta.
     - Acessa a seção de tickets, onde seleciona por prioridade o ticket que vai atender.
     - O sistema abre uma janela de chat onde o atendente pode enviar mensagens ao cliente.
     - O atendente cumprimenta o cliente e se coloca à disposição para ajudar.
     - A comunicação continua no chat até que o atendente encerre o chat.
     - Se o atendente resolver o problema ou tirar as dúvidas do cliente, ele tem a opção de encerrar o chat.
     - Se o cliente precisar de mais assistência ou tiver outras perguntas, a comunicação pode continuar no chat.

### User Story 14:

- Tarefa: Como administrador, quero que cada problema tenha um tempo de resposta definido para saber qual deve ser priorizado.

  - Critério de Aceitação:

  - O sistema deve calcular um tempo esperado para cada problema.
  - O sistema deve destacar e sinalizar os chamados de acordo com seu tempo para que não exceda o tempo de reposta definido.

  - Cenário:

     - O administrador faz login na sua conta.
     - Acessa a seção de gerenciamento de tickets ou chamados.
     - Visualiza os tickets ordenados de acordo com sua prioridade.
     - O sistema destaca ou sinaliza os tickets de acordo com o tempo esperado de resposta para cada um.
     - Se houver dois tickets com prioridade alta, o sistema prioriza aquele que está esperando há mais tempo.
     - O administrador pode revisar a lista de tickets e tomar decisões com base na priorização feita pelo sistema.
     - Garante que os tickets sejam tratados de forma eficiente, minimizando o tempo de espera dos clientes e mantendo a qualidade do serviço.

### User Story 15:

- Tarefa: Como cliente, desejo um FAQ com possíveis soluções para poder resolver problemas frequentes.

  - Critério de Aceitação:

     - O sistema deve fornecer uma seção de FAQ (Frequently Asked Questions) acessível aos clientes.
     - O FAQ deve conter uma lista de perguntas frequentes relacionadas aos problemas mais comuns enfrentados pelos clientes.
     - Para cada pergunta frequente, o FAQ deve fornecer uma resposta clara e detalhada que ajude o cliente a resolver o problema.
     - O FAQ deve ser organizado de forma clara e intuitiva, permitindo aos clientes encontrar facilmente as respostas para suas dúvidas.
     - Deve haver uma opção para os clientes entrarem em contato com o suporte caso não encontrem a solução para seu problema no FAQ.

  - Cenário:

     - O cliente acessa o sistema e navega até a seção de perguntas frequentes.
     - Encontra a seção de FAQ e entra nela.
     - Visualiza uma lista de perguntas frequentes sobre problemas comuns.
     - Seleciona uma pergunta que corresponda ao seu problema atual.
     - Lê a resposta fornecida e verifica se ela resolve o seu problema.
     - Se a resposta resolve o problema, o cliente segue as instruções fornecidas no FAQ.
     - Se a resposta não resolver o problema, o cliente pode entrar em contato com o suporte para obter assistência adicional.

### User Story 16:

- Tarefa: Como atendente, desejo poder alterar o status de um chamado entre "aberto", "em atendimento" e "finalizado", para acompanhar e gerenciar o progresso dos chamados de forma eficiente.

  - Critério de Aceitação:

     - O sistema deve fornecer uma interface para os atendentes alterarem o status de um chamado.
     - Os status disponíveis para seleção devem incluir "aberto", "em atendimento" e "finalizado".
     - Ao alterar o status de um chamado para "em atendimento", o sistema deve registrar a data e hora em que o atendimento começou.
     - Ao alterar o status de um chamado para "finalizado", o sistema deve registrar a data e hora em que o atendimento foi concluído.
     - Deve haver uma opção para adicionar comentários ou notas ao alterar o status de um chamado, permitindo registrar informações relevantes sobre o progresso do atendimento.
     - O sistema deve garantir que apenas os atendentes autorizados tenham permissão para alterar o status de um chamado.

  - Cenário:

     - O atendente faz login na sua conta.
     - Seleciona um chamado para o qual deseja atender e alterar o status.
     - Encontra a opção para alterar o status e escolhe entre "aberto", "em atendimento" ou "finalizado".
     - Se selecionar "em atendimento", o atendente adiciona um comentário informando que o atendimento começou.
     - Se selecionar "finalizado", o atendente adiciona um comentário informando que o atendimento foi concluído.
     - Confirma a alteração de status do chamado.
     - O sistema registra a data e hora da alteração de status, bem como quaisquer comentários adicionados pelo atendente.
     - Verifica se o status do chamado foi atualizado corretamente e se todas as informações relevantes foram registradas.

### User Story 19:

- Tarefa: Como administrador, quero poder cadastrar soluções para problemas comuns.

  - Critério de Aceitação:

     - O sistema deve fornecer uma funcionalidade para o administrador cadastrar soluções para problemas comuns enfrentados pelos clientes.
     - Deve haver uma interface clara e intuitiva para o cadastro de soluções.
     - Cada solução cadastrada deve incluir um título, uma descrição detalhada do problema e a solução recomendada.
     - O sistema deve permitir a associação de uma ou mais categorias a cada solução cadastrada, facilitando a organização e pesquisa.
     - Deve ser possível editar e excluir soluções cadastradas, caso necessário.
     - As soluções cadastradas devem estar disponíveis para consulta pelos atendentes e clientes, a fim de ajudar na resolução de problemas.

  - Cenário:

     - O administrador faz login na sua conta de administrador.
     - Acessa a seção de cadastro de soluções para problemas comuns.
     - Preenche os campos necessários, incluindo título, descrição do problema e solução recomendada.
     - Confirma o cadastro da solução.
     - Verifica se a solução cadastrada está disponível na lista de soluções.
     - Se necessário, o administrador pode editar ou excluir uma solução cadastrada.
     - Os atendentes e clientes podem acessar a lista de soluções cadastradas para encontrar ajuda na resolução de problemas comuns.


<h2> Vídeo demonstrativo </h2><a name="video"></a>

<h3> Cliente </h3>

https://github.com/Code-Nine-FTC/API-2024.1/assets/79583088/1c0f1f5a-456e-499d-aa1d-f2e8230c67cd

<h3> Atendente </h3>

https://github.com/Code-Nine-FTC/API-2024.1/assets/79583088/8f481dc3-29c6-43df-8177-2877be10462c

<h3> Administrador </h3>

https://github.com/Code-Nine-FTC/API-2024.1/assets/79583088/d2effc97-8d2b-4f07-bad5-825955ea8c9a


