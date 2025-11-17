// Reutilizáveis
Cypress.Commands.add('searchProduct', (term) => {
  // tenta encontrar campo de busca por vários seletores
  cy.get('input[placeholder*="Buscar"], input[id*="search"], input[name*="s"]').first().clear().type(term + '{enter}')
})

Cypress.Commands.add('openFirstProductFromResults', (partialName) => {
  cy.contains(new RegExp(partialName, 'i')).first().click()
})

Cypress.Commands.add('addProductToCart', (quantity = 1) => {
  cy.get('input[type="number"]').then($inp => {
    if ($inp.length) {
      cy.wrap($inp.first()).clear().type(String(quantity))
    }
  })
  cy.get('button').contains(/adicionar ao carrinho|adicionar|add to cart|comprar/i).first().click()
})
