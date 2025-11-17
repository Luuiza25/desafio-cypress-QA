/// <reference types="cypress" />
describe('Produtos / Busca / Filtros', () => {
  beforeEach(() => cy.visit('/'))

  it('Visualizar lista de produtos na home', () => {
    cy.get('.product-block, .product, .products .product').should('exist')
  })

  it('Buscar produto e abrir a página do produto', () => {
    cy.searchProduct('camiseta')
    cy.get('.product-block, .products .product').first().click()
    cy.get('h1, h2').should('exist')
    cy.get('button').contains(/adicionar ao carrinho|comprar/i).should('be.visible')
  })

  it('Filtrar por categoria e validar', () => {
    cy.contains(/feminino|masculino|promoções|novidades/i).first().click({ force: true })
    cy.get('.product-block, .products .product').should('exist')
  })
})
