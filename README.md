# BlueStock - Sistema de Controle de Produtos

Projeto estático em HTML, CSS e JavaScript criado para aulas de automação de testes com Cypress.

## Páginas

- `index.html`: tela de login
- `cadastro.html`: cadastro de usuários
- `produtos.html`: consulta, busca e exclusão de produtos
- `produto-form.html`: cadastro e edição de produtos

## Usuário inicial

- E-mail: `admin@bluestock.com`
- Senha: `Admin@123`

## Persistência

O projeto usa `localStorage`, então os dados ficam salvos no navegador.

## Como executar

Abra o arquivo `index.html` no navegador ou use uma extensão como Live Server no VS Code.

## IDs úteis para Cypress

### Login

- `formLogin`
- `emailLogin`
- `senhaLogin`
- `btnEntrar`
- `alertaLogin`
- `linkCadastroUsuario`

### Cadastro de usuário

- `formCadastroUsuario`
- `nomeUsuario`
- `emailUsuario`
- `senhaUsuario`
- `btnCadastrarUsuario`
- `alertaCadastroUsuario`
- `linkLogin`

### Consulta de produtos

- `campoBuscaProduto`
- `btnLimparBusca`
- `btnNovoProduto`
- `tabelaProdutos`
- `corpoTabelaProdutos`
- `mensagemSemProdutos`
- `btnEditarProduto-1`, `btnEditarProduto-2`...
- `btnExcluirProduto-1`, `btnExcluirProduto-2`...
- `modalConfirmacao`
- `btnCancelarExclusao`
- `btnConfirmarExclusao`

### Formulário de produtos

- `formProduto`
- `produtoId`
- `codigoProduto`
- `nomeProduto`
- `categoriaProduto`
- `precoProduto`
- `estoqueProduto`
- `statusProduto`
- `descricaoProduto`
- `btnSalvarProduto`
- `btnCancelarProduto`
- `alertaFormularioProduto`
