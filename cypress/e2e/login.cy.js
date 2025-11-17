/// <reference types="cypress" />
describe('Login - Fluxos', () => {
  beforeEach(() => cy.visit('/'))

  it('Login com credenciais válidas (se existir formulário)', () => {
    cy.get('a, button').contains(/entrar|login|sign in/i).first().click({ force: true })
    cy.get('input[type="email"], input[name="email"], input[id*="email"]').first().type('usuario@test.com')
    cy.get('input[type="password"], input[name="password"], input[id*="password"]').first().type('senha123{enter}')
    cy.contains(/meu perfil|sair|logout|bem-vindo/i, { timeout: 8000 }).should('exist')
  })

  it('Login com senha inválida deve mostrar erro', () => {
    cy.get('a, button').contains(/entrar|login|sign in/i).first().click({ force: true })
    cy.get('input[type="email"], input[name="email"], input[id*="email"]').first().type('usuario@test.com')
    cy.get('input[type="password"], input[name="password"], input[id*="password"]').first().type('senhaErrada{enter}')
    cy.contains(/senha incorreta|credenciais inválidas|error|invalid/i).should('exist')
  })
})
