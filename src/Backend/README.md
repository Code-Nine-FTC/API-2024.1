# Backend

Este é o backend do projeto realizado pela equipe CodeNine.

## Tecnologias Utilizadas:

1. TypeOrm
2. Express
3. Cors
4. TypeScript
5. Node.js
6. Insomnia

## Para Rodar o Projeto:

1. Clone este repositório.
2. Configure o arquivo `.env` dentro da pasta `config`.
3. Execute `npm install` para instalar as dependências do projeto.
4. Execute `npm run dev:app` para iniciar o servidor.

## Estrutura de Pastas:

Backend/
│
├── src/
│   │
│   ├── config/             # Configuração do aplicativo   
│   │   ├── database.ts     # Arquivo de configuração da conexão com o banco de dados
│   │   ├── .env            # Arquivo de configuração para variáveis de ambiente
│   │   └── bd/
│   │       └── db.sql      # Script do Banco de Dados         
│   │
│   ├── controllers/        # Funções que controlam o fluxo de dados e as respostas HTTP
│   │   ├── clienteController.ts
│   │   └── funcionarioController.ts
│   │
│   ├── entities/           # Definições das entidades do TypeORM
│   │   ├── chamado.ts
│   │   ├── cliente.ts
│   │   ├── faq.ts
│   │   ├── funcionario.ts
│   │   └── resposta.ts
│   │
│   ├── interfaces/         # Interfaces específicas do aplicativo
│   │   ├── ICliente.ts
│   │   ├── IFuncionario.ts
│   │   ├── IFaq.ts
│   │   ├── IChamado.ts
│   │   └── IResposta.ts
│   │
│   ├── routes/             # Rotas da API
│   │   ├── clienteRoutes.ts
│   │   └── funcionarioRoutes.ts
│   │
│   ├── services/           # Funções de serviço que interagem diretamente com o banco de dados
│   │   ├── clienteService.ts
│   │   └── funcionarioService.ts
│   │
│   └── app.ts           # Arquivo principal do aplicativo, onde as rotas são configuradas e o servidor Express é iniciado 
│
├── package.json            # Arquivo de configuração do Node.js e das dependências do projeto
│
├── package-lock.json       # Arquivo gerado pelo npm para travar as versões das dependências
│
├── README.md               # Readme github
│
├── tsconfig.json           # Arquivo de configuração do TypeScript
│
└── .gitignore              # Arquivo de configuração do Git para ignorar arquivos e pastas não desejados no repositório
