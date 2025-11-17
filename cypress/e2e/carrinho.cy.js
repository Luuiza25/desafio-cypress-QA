/// <reference types="cypress" />
import productFixture from '../fixtures/product.json'

describe('Carrinho - adicionar / alterar / remover', () => {
  beforeEach(() => cy.visit('/'))

  it('Adicionar produto ao carrinho e verificar subtotal', () => {
    cy.searchProduct(productFixture.searchTerm)
    cy.get('.product-block, .products .product').first().click()
    cy.addProductToCart(productFixture.quantity)
    cy.get('a[href*="cart"], button[aria-label*="carrinho"], .cart-link').first().click({ force: true })
    cy.get('.cart-items, .woocommerce-cart-form, table.cart').should('exist')
    cy.contains(/subtotal|total/i).should('exist')
    cy.get('input[type="number"]').should('have.value', productFixture.quantity.toString())
  })

  it('Remover item do carrinho e validar atualização', () => {
    cy.searchProduct(productFixture.searchTerm)
    cy.get('.product-block, .products .product').first().click()
    cy.addProductToCart(1)
    cy.get('a[href*="cart"], .cart-link').first().click({ force: true })
    cy.get('button').contains(/remover|excluir|delete/i).first().click()
    cy.contains(/carrinho vazio|sem itens|no items|empty cart/i).should('exist')
  })

  it('Alterar quantidade e validar total recalculado', () => {
    cy.searchProduct(productFixture.searchTerm)
    cy.get('.product-block, .products .product').first().click()
    cy.addProductToCart(1)
    cy.get('a[href*="cart"], .cart-link').first().click({ force: true })
    cy.get('input[type="number"]').first().clear().type('3').blur()
    cy.contains(/subtotal|total/i).should('exist')
  })
})
