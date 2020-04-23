# Teste Backend 

- Desenvolver uma Api onde o usuário possa se criar uma conta, postar e comentar posts.

## Tabela de Rotas e suas funcionalidades

|MÉTODO|ROTA|PARAMERTOS|FUNCIONALIDADE
|----------------|-------------------------------|-----------------------------|--------
|POST|/users|Informar um Body com `username`, `email` e `password`| Cria um usuário
|POST|/sessions||Cria um Token e Inicia uma session com o usuário
|GET|/users||Retorna todos os usuários cadastrados
|GET|/posts||Retorna todas publicações criadas
|GET|/posts/***user_id***|***user_id***: ID de usuário| Retorna publicações de um determinado usuário
|GET|/***post_id***/comments|***post_id***: ID da publicação| Retorna os comentários de uma determinada publicação
|PUT|/users|Informar um Body com `username`, `email`, `oldPassword`,`password` e `confirmPassword`|Atualiza o usuário logado na aplicação
|DELETE|/users||Deleta o usuário logado na aplicação
|POST|/posts|Informar um Body com `text`|Cria uma publicação
|PUT|/posts/***post_id***|***post_id***: ID da publicação; Informar um Body com `text`do post| Atualiza a publicação **se** o usuário logado for o autor
|DELETE|/posts/***post_id***|***post_id***: ID da publicação|| Deleta a publicação **se** o usuário logado for o autor
|POST|/***post_id***/comments|***post_id***: ID da publicação; Informar um Body com `text` do comentário| Cria um comentário na publicação informada 
|PUT|/***post_id***/comments/***comment_id***|***post_id***: ID da publicação; ***comment_id***: ID do comentário; Informar um Body com `text` do comentpario| Atualiza o comentário
|DELETE|/***post_id***/comments/***comment_id***|***post_id***: ID da publicação; ***comment_id***: ID do comentário| Deleta o comentário
