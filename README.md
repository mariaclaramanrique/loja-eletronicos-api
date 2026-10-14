# API — Loja de Eletrônicos

Atividade de Tecnologia de Construção de Software I.

## Executar o projeto

1. Execute `npm install` na pasta do projeto.
2. Execute `banco.sql` no MySQL ou MariaDB.
3. Copie `nodemon.example.json` para `nodemon.json` e configure as credenciais do banco.
4. O usuário configurado precisa das permissões SELECT, INSERT, UPDATE e DELETE no banco `loja_eletronicos`.
5. Execute `npm start`.

API disponível em http://localhost:3000.

## Testar no Postman

Importe o arquivo `Loja-Eletronicos.postman_collection.json`.

Execute primeiro o POST para cadastrar um produto. Use o ID retornado nas requisições GET por ID, PUT e DELETE.

Rotas disponíveis:

- GET /produto
- GET /produto/:id
- POST /produto
- PUT /produto/:id
- DELETE /produto/:id
