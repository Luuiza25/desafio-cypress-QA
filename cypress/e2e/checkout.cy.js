/// <reference types="cypress" />
import user from '../fixtures/user.json'

describe('Checkout - fluxo feliz e negativos', () => {
  beforeEach(() => cy.visit('/'))

  it('Finalizar compra com dados válidos (simulado)', () => {
    cy.searchProduct('fone')
    cy.get('.product-block, .products .product').first().click()
    cy.addProductToCart(1)
    cy.get('a[href*="cart"], .cart-link').first().click({ force: true })
    cy.get('button').contains(/finalizar|checkout|pagar|confirmar/i).first().click({ force: true })

    cy.get('input[name="name"], input[id*="name"]').first().type(user.name)
    cy.get('input[name="cpf"], input[id*="cpf"]').first().type(user.cpf)
    cy.get('input[name="cep"], input[id*="cep"]').first().type(user.cep)
    cy.get('input[name="address"], input[id*="address"]').first().type(user.address)
    cy.get('input[name="email"], input[id*="email"]').first().type(user.email)

    cy.get('button').contains(/confirmar pedido|confirm order|finalizar compra/i).first().click()
    cy.contains(/pedido realizado|obrigado pela compra|order confirmed|success/i, { timeout: 10000 }).should('exist')
  })

  it('Checkout com endereço incompleto mostra erro', () => {
    cy.searchProduct('fone')
    cy.get('.product-block, .products .product').first().click()
    cy.addProductToCart(1)
    cy.get('a[href*="cart"], .cart-link').first().click({ force: true })
    cy.get('button').contains(/finalizar|checkout|pagar/i).first().click({ force: true })

    cy.get('input[name="name"], input[id*="name"]').first().type(user.name)
    cy.get('input[name="email"], input[id*="email"]').first().type(user.email)
    cy.get('button').contains(/confirmar pedido|finalizar compra/i).first().click()
    cy.contains(/preencha|campo obrigatório|required|error/i).should('exist')
  })
})
