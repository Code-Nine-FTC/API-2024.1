<h1> Segunda Sprint </h1>

<h2> Índice </h2>

- [Valor da Sprint](#valor)
- [DoR (Definition of Ready)](#dor)
- [DoD (Definition of Done)](#dod)
- [Sprint Backlog](#backlog)
- [Burndown](#burndown)
- [Tasks](#tasks)
- [Vídeo demonstrativo do Wireframe](#video)
  
<br>

<h2> Valor da Sprint</h2><a name="valor"></a>

Desenvolver uma versão inicial do aplicativo, visando o menor produto viável (MVP)

<br>

<h2> DoR (Definition of Ready) </h2><a name="dor"></a>

### Sprint 2

- Modelo de dados ✔

- Protótipo navegável ✔

- Planejamento para a sprint ✔

<br>

<h2> DoD (Definition of Done) </h2><a name="dod"></a>

- FAQ com informações ✔

- Função de Cadastro do cliente ✔

- Função de Cadastro do funcionário ✔

- Função de login do cliente ✔

- Função de login do funcionário ✔

- Edição de dados do cliente ✔

- Edição de dados do funcionário ✔

<br>

<h2> Sprint Backlog </h2> <a name="backlog"></a>

| Rank | Prioridade | Tarefa | Estimativa |
| --- | --- | --- | --- |
| 1 | Alta | Criação da barra de navegação | 10 horas |
| 2 | Alta | Desenvolvimento do modelo físico do Banco de Dados | 03 horas |
| 3 | Alta | Desenvolvimento do Sprint Backlog | 03 horas |
| 4 | Alta | Documentação do projeto no Git | 03 horas |
| 5 | Alta | Desenvolvimento do sistema de cadastro | 25 horas |
| 6 | Alta | Desenvolvimento do sistema de login | 15 horas |
| 7 | Alta | Desenvolvimento dos sitema de edição de dados | 13 horas |
| 8 | Alta | Desenvolvimento dos sitema de visualização de usuários | 10 horas |
| 9 | Alta | Desenvolvimento das telas de login | 5 horas |
| 10 | Alta | Desenvolvimento das telas de cadastro | 6 horas |
| 11 | Alta | Desenvolvimento das telas de edição | 6 horas |
| 12 | Médio | Desenvolvimento do FAQ | 8 horas |
| 13 | Baixa | Estudo de TypeOrm | 5 horas |

<br>

<h2> Burndown Chart </h2><a name="burndown">

![Burndown sprint 2](/src/docs/burndownsprint2.png)

<br>

<h2> Tarefas </h2><a name="tasks"></a>

### User Story 1:

- Tarefa: Como cliente, desejo utilizar um sistema de cadastro para acessar os recursos disponíveis do website.

  - Critérios de Aceitação:

     - O sistema de cadastro deve permitir que um cliente se registre com sucesso.
     - O cliente deve poder acessar os recursos do website após o registro.
     - As informações fornecidas durante o cadastro devem ser armazenadas corretamente no sistema.

  - Cenário:

    - Cliente acessa a página de cadastro.
    - Preenche os campos obrigatórios (nome, e-mail, senha, cpf).
    - Clica no botão de registro.
    - Recebe uma confirmação de que o registro foi bem-sucedido por meio de pop-up.
    - Tenta acessar os recursos do website e consegue com sucesso.

### User Story 2:

- Tarefa: Como administrador, desejo registrar atendentes com seu tipo de serviço no sistema.

  - Critérios de Aceitação:

     - O sistema deve permitir que o administrador realize o cadastro de atendentes.
     - Os atendentes devem ser associados ao seu tipo de serviço prestado.

  - Cenário:

     - Adminitrador acessa a pagina de adicionar novo atendente.
     - Preenche os campos obrigatorios, incluindo o seu tipo de serviço.
     - Recebe uma confirmação de novo Atendente cadastrado.

### User Story 3:

- Tarefa: Como cliente, desejo ter a possibilidade de visualizar e editar as informações de minha conta para mantê-la atualizada.

  - Critérios de Aceitação:

     - O sistema deve fornecer uma interface para que o cliente possa visualizar suas informações.
     - O sistema deve permitir modificações como nome, e-mail e senha do usuario.
     - O sistema deve informar que os dados foram atualizados caso tenha alguma alteração.
     - Após a edição, o sistema deve garantir o armazenamento seguro das modificações.

  - Cenários:

     - O usuario realiza login no sistema.
     - O usuario entra na página minha conta.
     - Visualiza as informações existentes.
     - Clica no botão de editar conta.
     - Modifica os campos desejados.
     - Verifica se as informações foram atualizadas com sucesso.

### User Story 4:

- Tarefa: Como administrador, desejo poder visualizar e gerenciar todos os atendentes cadastrados no sistema, incluindo a capacidade de editar informações.

  - Critérios de Aceitação:

     - O sistema deve possuir uma interface para que o administrador possa ver todos os atendentes.
     - O administrador pode editar todos os atendentes cadastrados.
     - Após editada, as informações dos atendentes devem ser refletidas corretamente no sistema.
     - Somente o administrador pode editar informações dos atendentes.

  - Cenários:

     - O administrador navega até a pagina de gerenciar atendentes.
     - O adminitrador visualiza todos os atendentes cadastrados.
     - O adminitrador seleciona o atendente desejado para ver suas informações.
     - Edita as informções necessarias.
     - Verifica se as informações foram salvas no sistema.
     - Apenas o administrador pode acessar a pagina de gerenciamento de atendentes.

### User Story 5:

- Tarefa: Como cliente, desejo realizar login no sistema utilizando e-mail e senha.

  - Critérios de Aceitação:

     - O sistema deve possuir um formulário onde deve se colocar o e-mail e senha.
     - O cliente pode enviar esse formulário de login.
     - O sistema realiza a autenticação de usuário.
     - O sistema deve redirecionar o usuário em caso de sucesso para a pagina principal.
     - Em caso de falha, deverá aparecer uma mensagem contendo o motivo do erro.

  - Cenários:

     - O cliente navega até a pagina de login.
     - Insere e-mail e senha.
     - clica no botão de login.
     - O sistema valida as informações
     - Se sucesso, então o cliente é direcionado para a pagina home.
     - Se ocorrer um erro, deve aparecer uma mensagem contendo o motivo do erro.
     - O cliente tenta novamente com as credencias corretas, se sucesso então ele é redirecionado.

### User Story 6:

- Tarefa: Como atendente, desejo realizar login no sistema utilizando CPF e senha.

  - Critérios de Aceitação:

     - O sistema deve possuir um formulário onde é necessario inserir e-mail e senha.
     - O atendente pode enviar esse formulário de login.
     - O sistema realiza a autenticação de usuário.
     - O sistema deve redirecionar o usuário em caso de sucesso para a pagina principal.
     - Em caso de falha, deve-se aparecer uma mensagem contendo o motivo do erro.

  - Cenários:

     - O atendente navega até a pagina de login.
     - Insere e-mail e a senha.
     - Clica no botão de login.
     - O sistema valida as informações
     - Se sucesso, então o atendente  é direcionado para a pagina home.
     - Se erro, deve aparecer uma mensagem contendo o motivo do erro.
     - O atendente tenta novamente com as credencias corretas, se sucesso então ele é redirecionado.

### User Story 7:

- Tarefa: Como administrador, desejo realizar login no sistema utilizando CPF e senha.

  - Critério de Aceitação:

     - O sistema deve possuir um formulário onde deve se colocar o e-mail e senha.
     - O administrador pode enviar esse formulário de login.
     - O sistema realiza a autenticação de usuário.
     - O sistema deve redirecionar o usuário em caso de sucesso para a pagina principal.
     - Em caso de falha, deve-se aparecer uma mensagem contendo o motivo do erro.

  - Cenários:

     - O administrador navega até a pagina de login.
     - Insere e-mail e a senha.
     - Clica no botão de login.
     - O sistema valida as informações
     - Se sucesso, então o administrador é direcionado para a pagina home.
     - Se erro, deve aparecer uma mensagem contendo o motivo do erro.
     - O administrador tenta novamente com as credencias corretas, se sucesso então ele é redirecionado.


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

<h2> Vídeo demonstrativo </h2><a name="video"></a>

