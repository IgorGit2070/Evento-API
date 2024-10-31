# Projeto de Gerenciamento de Eventos

## Descrição do Projeto

Este projeto é um sistema de gerenciamento de eventos, permitindo o cadastro e a gestão de eventos e seus participantes. A aplicação oferece uma interface amigável para adicionar, editar e excluir eventos, além de visualizar e gerenciar os participantes de cada evento.

## Status do Projeto

🚧 **Projeto em construção** 🚧

## Funcionalidades

🔨 **Funcionalidades do projeto**

- **Cadastro de Eventos**: Permite adicionar novos eventos com título, data, local e descrição.
- **Visualização de Eventos**: Visualização dos eventos.
- **Edição de Eventos**: Possibilita editar as informações de eventos já cadastrados.
- **Exclusão de Eventos**: Funcionalidade para excluir eventos.
- **Lista de Participantes**: Visualização dos participantes de cada evento, com opções para adicionar, editar ou excluir participantes.

## Acesso ao Projeto

**Para acessar o código-fonte do projeto, você pode clonar o repositório:**

```bash
git clone https://github.com/IgorGit2070/Evento-API.git
```

**Ou faça o download do repositório**

## 🛠️ Abrir e Rodar o Projeto

1. **Navegue até o diretório do projeto**:
   ```bash
   cd Evento-API
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Inicie o servidor local para a simulação do server**: Ele está configurado para rodar na porta 5000
   ```bash
   npm run server
   ```
4. **Inicie outro servidor local para o front**: Ele está configurado para rodar na porta 5173
   ```bash
   npm run dev
   ```
5. Abra o navegador e acesse **`http://localhost:5173`** para acessar a aplicação.
   ```bash
   http://localhost:5173
   ```
6. Cado queira conferir os endpoints abra o navegador e acesse **`http://localhost:5000`**.
   ```bash
   http://localhost:5000
   ```

## Tecnologias Utilizadas

- **React**: Biblioteca para construir interfaces de usuário.
- **Vite**: Ferramenta de construção que oferece um ambiente de desenvolvimento rápido e otimizado, com uma configuração simples para projetos React.
- **React Bootstrap**: Componentes estilizados para uma interface responsiva.
- **React Router**: Para navegação entre páginas.
- **CSS Modules**: Para estilização modular.
- **JSON Server**: Para simular uma API RESTful a partir de um arquivo JSON, facilitando o desenvolvimento e testes da aplicação.

## Sugestões para Melhorias Futuras

- Implementar autenticação de usuários para restringir o acesso a funcionalidades administrativas.
- Adicionar filtros e buscas para facilitar a localização de eventos e participantes.
- Criar uma interface mais rica e responsiva, utilizando animações e transições.
- Integrar com um banco de dados real para persistência de dados.
