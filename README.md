# task-manager
Gerenciador De Tarefas - Um Pacote Completo para Gerenciar Pessoas, Projetos e Tudo Mais.


## Atualizar a Branch:
git pull origin develop

git checkout develop --> Troca de branch

git merge origin/develop

npm install

## Subir Projeto:
git add .

git commit -m "DESCRIÇÃO 🚧"

git push origin develop

## Monorepo

## Rode na Rais da pasta guardiana-web
npm install

npm run dev:backend

npm run dev:frontend

## Estrutura de Pasta e Arquivos (Profissional e Escalável)

Light / Dark

```bash
C:\programa\task-manager
│
├── apps
│   ├── backend
│   │   └── .gitkeep
│   │
│   └── frontend
│       ├── public
│       ├── src
│       │   ├── app
│       │   │   ├── favicon.ico
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   │
│       │   └── features
│       │       └── auth
│       │           └── components
│       │               └── LoginForm.tsx
│       │
│       ├── eslint.config.mjs
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── tailwind.config.ts
│       └── tsconfig.json
│
├── docs
│   └── .gitkeep
│
├── packages
│   └── shared
│       └── .gitkeep
│
├── .editorconfig
├── .env.example
├── .gitignore
├── package.json
└── README.md

```