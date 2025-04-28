# Sistema de Gerenciamento de Senhas

## Descrição do Projeto

Este projeto consiste em um sistema web para gerenciamento de senhas, desenvolvido com o framework Ionic (Angular). O objetivo principal é facilitar a emissão, o controle e o atendimento de senhas em um ambiente com diferentes tipos de serviço (Geral, Prioritário, Exames). O sistema oferece funcionalidades para:

* **Emissão de Senhas:** Geração de senhas categorizadas por tipo (Geral, Prioritário, Exames) com controle de sequência diária.
* **Chamada de Senhas:** Interface para chamar a próxima senha da fila, com lógica de prioridade configurável.
* **Controle de Atendimento:** Ferramentas para iniciar e finalizar o atendimento de uma senha, registrando informações relevantes.
* **Relatórios:** Geração de relatórios diários e mensais detalhados sobre a emissão e o atendimento de senhas.
* **Visualização:** Exibição das últimas senhas chamadas para manter os usuários informados.
* **Reset de Senhas:** Funcionalidade para resetar os contadores e filas de senhas.

## Funcionalidades Principais

* **Emissão de Senha:** Permite ao usuário gerar uma nova senha selecionando o tipo de atendimento desejado.
* **Painel de Chamada:** Exibe a próxima senha a ser atendida e permite ao atendente iniciar e finalizar o atendimento.
* **Histórico de Chamadas:** Mostra as últimas senhas que foram chamadas.
* **Relatório Diário:** Apresenta um resumo das senhas emitidas e atendidas no dia atual, com detalhes por tipo.
* **Relatório Mensal:** Exibe um panorama das senhas emitidas e atendidas no mês corrente, também detalhado por tipo.
* **Reset do Sistema:** Permite zerar todos os contadores e filas de senhas para um novo ciclo.

## Tecnologias Utilizadas

* **Ionic Framework:** Framework de código aberto para desenvolvimento de aplicativos móveis híbridos e Progressive Web Apps (PWAs).
* **Angular:** Plataforma de desenvolvimento para construção de aplicações web.
* **TypeScript:** Superset tipado de JavaScript que melhora a escalabilidade e a manutenção do código.
* **HTML5:** Linguagem de marcação para estruturação do conteúdo web.
* **CSS3:** Linguagem de estilo para a apresentação visual da aplicação.
* **LocalStorage:** Utilizado para persistência de dados localmente no navegador.

## Como Executar o Projeto

Certifique-se de ter o Node.js e o Ionic CLI instalados em sua máquina.

1.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/joaofelipelira/tickets.git](https://github.com/joaofelipelira/tickets.git)
    cd tickets
    ```

2.  **Instalar as Dependências:**
    ```bash
    npm install
    ```

3.  **Executar o Servidor de Desenvolvimento:**
    ```bash
    ionic serve
    ```
    Este comando irá construir a aplicação e abrir um servidor de desenvolvimento no seu navegador (geralmente em `http://localhost:8100`).

## Contribuição

Se você tiver alguma sugestão de melhoria ou encontrar algum problema, sinta-se à vontade para abrir uma Issue neste repositório. Pull requests também são bem-vindos!

## Licença

Este projeto está licenciado sob a licença **Creative Commons Attribution 4.0 International**. Para visualizar uma cópia desta licença, visite [http://creativecommons.org/licenses/by/4.0/](http://creativecommons.org/licenses/by/4.0/).

---