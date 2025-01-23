# Adelog - Sistema de Gerenciamento de Caixa

Adelog é um sistema de gerenciamento de caixa desenvolvido para facilitar o controle de vendas, cadastro de produtos, e gerenciamento de usuários em um mercadinho. O sistema foi desenvolvido com **React**, **Supabase**, **Styled Components** e **QuaggaJS** para leitura de códigos de barras.

## Funcionalidades

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


