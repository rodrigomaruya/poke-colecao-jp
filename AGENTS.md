<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Regras do Projeto

## 1. Arquitetura Next.js

- Use o App Router do Next.js.
- Dê preferência a React Server Components.
- Não use `"use client"` por padrão.
- Use Client Components somente quando houver necessidade de:
  - `useState`
  - `useEffect`
  - `useContext`
  - eventos de interação do navegador
  - APIs exclusivas do navegador
  - bibliotecas que exigem Client Component

- Quando uma página precisar de interação no cliente, mantenha o Client Component o menor e mais isolado possível.
- Evite transformar uma página inteira em Client Component quando apenas uma pequena parte precisa ser interativa.

## 2. Componentes

- Não coloque toda a interface em um único arquivo.
- Crie componentes separados quando uma parte da interface tiver responsabilidade própria ou puder ser reutilizada.
- Componentes de apresentação devem ser preferencialmente Server Components.
- Componentes interativos devem ser Client Components.
- Evite criar componentes excessivamente pequenos sem necessidade.
- Antes de criar um novo componente, verifique se já existe um componente que possa ser reutilizado.

## 3. Organização

- Mantenha a lógica de negócio separada da interface.
- Coloque funções auxiliares reutilizáveis em `lib/`.
- Coloque componentes reutilizáveis em `components/`.
- Mantenha a configuração do Prisma relacionada ao banco em `lib/`.
- Mantenha os modelos do banco em `prisma/`.
- Não coloque lógica de banco diretamente dentro de componentes de interface quando puder ser separada.

## 4. Prisma e PostgreSQL

- Use Prisma ORM para acesso ao PostgreSQL.
- Não escreva SQL diretamente sem necessidade.
- Não altere o banco manualmente quando uma migration do Prisma for apropriada.
- Antes de alterar o schema do Prisma, verifique os modelos e relacionamentos existentes.
- Nunca remova dados ou tabelas existentes sem explicar claramente o impacto.
- Não exponha credenciais ou variáveis do `.env` no código ou nas respostas.

## 5. Server e Client

Sempre que possível, siga esta preferência:

Server Component
↓
Busca dados / lógica no servidor
↓
Client Component
↓
Interação do usuário

Evite:

Server Component
↓
transformar tudo em Client Component
↓
fazer toda a lógica no navegador

## 6. TypeScript

- Use TypeScript de forma rigorosa.
- Evite `any`.
- Crie tipos apropriados quando necessário.
- Não desabilite verificações do TypeScript apenas para resolver erros rapidamente.
- Prefira tipos inferidos pelo TypeScript quando isso deixar o código mais simples.

## 7. Formulários e validação

- Valide dados recebidos pelo usuário.
- Não confie apenas na validação do frontend.
- Dados enviados ao servidor devem ser validados novamente no servidor.
- Evite duplicar regras de validação desnecessariamente.

## 8. Segurança

- Nunca armazene senhas em texto puro.
- Nunca coloque informações sensíveis no código.
- Nunca exponha variáveis de ambiente secretas ao cliente.
- Antes de implementar autenticação ou autorização, considere quais dados o usuário pode acessar.
- Não confie em IDs enviados pelo cliente para determinar autorização.

## 9. Antes de alterar o projeto

Antes de criar ou modificar arquivos:

1. Analise a estrutura existente.
2. Verifique se já existe código relacionado à tarefa.
3. Reutilize componentes e funções existentes quando apropriado.
4. Evite criar arquivos ou abstrações desnecessárias.
5. Respeite os padrões já utilizados no projeto.

## 10. Ao receber uma tarefa

Quando eu pedir para criar uma funcionalidade:

1. Primeiro analise o que já existe.
2. Explique brevemente o que será alterado.
3. Prefira a solução mais simples que respeite estas regras.
4. Priorize Server Components.
5. Crie Client Components somente quando necessário.
6. Separe componentes quando houver uma responsabilidade clara.
7. Não instale novas dependências sem necessidade.
8. Não altere partes não relacionadas à tarefa.
9. Depois da implementação, verifique possíveis erros de TypeScript, lint e build quando apropriado.

## 11. Estilo de código

- Prefira código simples e legível.
- Evite abstrações prematuras.
- Evite overengineering.
- Não crie uma arquitetura complexa para resolver um problema simples.
- Use nomes claros para arquivos, funções, componentes e variáveis.
- Mantenha cada arquivo com uma responsabilidade clara.

## 12. Regra principal

Não implemente apenas para "fazer funcionar".

A implementação deve priorizar:

1. Simplicidade
2. Segurança
3. Manutenibilidade
4. Performance
5. Reutilização quando fizer sentido

Se houver conflito entre uma solução rápida e uma solução significativamente mais segura ou correta, explique o problema antes de escolher a solução.

<!-- END:nextjs-agent-rules -->
