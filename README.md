# Sistema de Gerenciamento de Mercadinho

Este é um sistema de gerenciamento de loja de conveniência desenvolvido em **React** com integração ao **Supabase** para gerenciamento de dados. O projeto permite gerenciar mais de uma loja em um banco de dados.

## Tecnologias Usadas 🚀

- ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) - Biblioteca JavaScript para construção de interfaces.
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) - Banco de dados de código aberto baseado em PostgreSQL.
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) - Linguagem de programação usada no projeto.

## Funcionalidades 🛠️
### Usuários

- **Administrador (adm):**
  - Pode adicionar, editar e excluir produtos.
  - Gerencia o cadastro de usuários.
  - Visualiza relatórios de vendas de todos os usuários.
- **Caixa (box):**
  - Não possui permissões para alterar produtos.
  - Pode adicionar produtos ao carrinho e realizar vendas.
  - apenas pode ver o histórico de vendas dele mesmo.

### Produtos

- Cadastro de produtos com os seguintes campos:
  - Nome
  - Quantidade
  - Preço
  - Código de barras (com leitura via câmera do dispositivo).
  - Categoria
- Possibilidade de editar e excluir produtos.

### Vendas

- Registro de cada venda realizada, permitindo o acompanhamento e gerenciamento de fluxo de saída.

## Tecnologias Utilizadas

- **React:** Framework JavaScript para criar interfaces de usuário dinâmicas.
- **Supabase:** Plataforma backend para banco de dados SQL e autenticação de usuários.
- **Styled Components:** Biblioteca para estilização de componentes no React.
- **QuaggaJS:** Biblioteca para leitura de códigos de barras utilizando a câmera do dispositivo.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

### Autor


