# 🎴 Poke Coleção JP

Uma aplicação web para explorar cartas Pokémon TCG, consultar expansões e descobrir cartas em diferentes idiomas, com foco especial no mercado japonês.

🔗 **Acesse a aplicação:** [Poke Coleção JP](https://poke-colecao-jp.vercel.app/)

## 📖 Sobre o projeto

O **Poke Coleção JP** é uma aplicação web desenvolvida com Next.js e TypeScript para facilitar a consulta de informações sobre cartas Pokémon.

O projeto integra a API do TCGdex para obter dados de cartas e expansões, permitindo explorar informações do Pokémon Trading Card Game em diferentes idiomas.

Além de ser uma aplicação funcional, o projeto faz parte da minha evolução como desenvolvedor, reunindo conhecimentos de desenvolvimento frontend, backend, banco de dados, autenticação e integração com APIs externas.

## ✨ Funcionalidades

- 🔐 **Cadastro de usuários:** criação de contas com e-mail e senha.
- 🔑 **Login:** autenticação de usuários.
- 🃏 **Consulta de cartas:** busca e visualização de informações de cartas Pokémon.
- 📦 **Consulta de expansões:** acesso aos dados dos sets disponíveis na API.
- 🌏 **Suporte a idiomas:** consulta de dados em japonês, português e inglês, conforme a disponibilidade na fonte.
- 📱 **Aplicação web:** acesso por navegador, com interface desenvolvida para a experiência web.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização                     |
| ---------- | ------------------------------ |
| Next.js    | Framework da aplicação         |
| React      | Construção da interface        |
| TypeScript | Tipagem estática               |
| PostgreSQL | Banco de dados relacional      |
| Prisma ORM | Acesso ao banco de dados       |
| TCGdex     | Consulta de cartas e expansões |
| Zod        | Validação de dados             |
| Argon2     | Hash de senhas                 |
| Lucide     | Ícones da interface            |

## 🏗️ Conceitos aplicados

Durante o desenvolvimento, foram trabalhados conceitos importantes para aplicações web modernas:

- Componentização e organização de interfaces.
- Uso de Server Components e Client Components no Next.js.
- Tipagem de dados com TypeScript.
- Integração com APIs externas.
- Validação de dados.
- Autenticação de usuários.
- Persistência de dados com PostgreSQL e Prisma.
- Organização de código e separação de responsabilidades.

## 🚀 Executando o projeto localmente

### Pré-requisitos

- Node.js compatível com o projeto.
- npm.
- Banco de dados PostgreSQL acessível.

### Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd poke-colecao-jp
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente exigidas pelo projeto em um arquivo `.env`, incluindo a conexão com o banco de dados.

Em seguida, configure o Prisma e aplique as migrações existentes de acordo com os scripts e a configuração do repositório.

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

> Os comandos de banco de dados podem variar conforme a configuração do Prisma. Consulte o `package.json` e a configuração do projeto antes de executar migrações.

## 🔌 Fonte de dados

O projeto utiliza o [TCGdex](https://tcgdex.dev/) para consultar informações sobre cartas e expansões do Pokémon TCG.

A disponibilidade de dados, idiomas, imagens e informações adicionais depende da API utilizada.

## 📌 Status

**Status: funcional e publicado.**

A aplicação possui cadastro e login funcionais e está disponível online.

Novas melhorias e funcionalidades podem ser desenvolvidas conforme a evolução do projeto.

## 👨‍💻 Desenvolvedor

Projeto pessoal desenvolvido para aplicar e aprimorar conhecimentos em desenvolvimento web com Next.js, React, TypeScript e PostgreSQL.

## ⚖️ Créditos e marcas registradas

Este é um projeto independente, sem afiliação oficial com a Nintendo, The Pokémon Company ou Creatures Inc.

Pokémon e Pokémon TCG são marcas de seus respectivos proprietários. Os dados são consultados por meio do TCGdex.
