This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Rodar localmente

Use Node.js 22.13 ou mais recente.

```bash
npm ci
npm run dev
```

Abra [a página de login](http://localhost:3000/login) e selecione **Criar conta** para o primeiro acesso. O comando `npm run dev` prepara o banco SQLite e guarda os dados de autenticação em `.data/`. Para sair, abra **Meu perfil** e selecione **Sair**.

## Configurar o login em produção

- Defina `BETTER_AUTH_URL` com a origem pública em HTTPS e `BETTER_AUTH_SECRET` com um segredo aleatório de pelo menos 32 caracteres. Gere um segredo com `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
- Use `DATABASE_URL` para conectar ao PostgreSQL. Em uma instalação de instância única, `AUTH_SQLITE_PATH` também é aceito quando aponta para um volume persistente.
- Com as variáveis de produção e `NODE_ENV=production`, execute `npm run db:migrate` antes de iniciar a aplicação.
- O cadastro cria contas com papel `student`. Depois de cadastrar e conferir a identidade da pessoa, o operador do servidor pode conceder acesso com `npm run admin:grant -- email-da-conta` e com o mesmo ambiente do site. Rode `npm run db:migrate` ao atualizar uma instalação.

## Administração

O menu **Administração** dá acesso a contas, sessões válidas, publicações e histórico de ações. Contas administrativas são geridas pelo operador do servidor. O botão **Editar módulos** abre o editor existente.

Para hospedar o site, mantenha o banco e as cópias de segurança em armazenamento privado e criptografado, com acesso restrito aos operadores. Configure HTTPS antes de liberar o cadastro público. Preserve o segredo da aplicação e as credenciais do banco nas variáveis do servidor.

## Comunidade NAO

Entre em uma conta e abra [Fórum](http://localhost:3000/forum). A comunidade oferece publicações por categoria, busca, respostas, curtidas e links para compartilhar discussões com outros participantes cadastrados.

Cada publicação aceita até três arquivos, com até 3 MB por arquivo e 4 MB somados. Os anexos são armazenados no mesmo banco do fórum e baixados mediante sessão. Entre os formatos aceitos estão `.crg`, `.xar`, `.py`, `.zip`, `.pdf` e imagens.

Contas com papel `moderator` ou `admin` podem encerrar e reabrir discussões, além de ocultar e restaurar publicações e respostas. O papel `moderator` é atribuído na coluna `role` da tabela `"user"` e concede os controles do fórum. Ao atualizar uma instalação, execute `npm run db:migrate` para criar as tabelas da comunidade.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
