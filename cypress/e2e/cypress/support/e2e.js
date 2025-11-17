import './commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  // evita que erros do app quebrem os testes
  return false
})
