# Cypress API

Este repositório contém um conjunto de testes end-to-end (E2E) desenvolvidos com Cypress para a API Restful Booker.

O objetivo do projeto é demonstrar conhecimentos em automação de testes de API usando comandos reutilizáveis e organização clara de testes.

## Conteúdo

- `cypress/e2e/buscar_agendamento.cy.js` — testes de busca de agendamento
- `cypress/e2e/cadastrar_agendamento.cy.js` — testes de cadastro de agendamento
- `cypress/e2e/deletar_agendamento.cy.js` — testes de exclusão de agendamento
- `cypress/e2e/update_agendamento.cy.js` — testes de atualização de agendamento
- `cypress/fixtures/` — payloads e constantes de teste
- `cypress/support/commands.js` — comandos customizados do Cypress

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes no Cypress:
   ```bash
   npx cypress open
   ```

## Sobre

Este projeto foi desenvolvido como parte de um teste padrão realizado através do curso QAzando.

---

# English

This repository contains a set of end-to-end (E2E) tests developed with Cypress for the Restful Booker API.

The purpose of this project is to demonstrate skills in API test automation using reusable custom commands and a clear test structure.

## Contents

- `cypress/e2e/buscar_agendamento.cy.js` — booking search tests
- `cypress/e2e/cadastrar_agendamento.cy.js` — booking creation tests
- `cypress/e2e/deletar_agendamento.cy.js` — booking deletion tests
- `cypress/e2e/update_agendamento.cy.js` — booking update tests
- `cypress/fixtures/` — test payloads and constants
- `cypress/support/commands.js` — custom Cypress commands

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Open Cypress test runner:
   ```bash
   npx cypress open
   ```

## About

This project was created as part of a standard test exercise from the QAzando course.
