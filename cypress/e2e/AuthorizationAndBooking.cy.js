import autozization from '../fixtures/LoginAndPassword.json'
import negativeAutozization from '../fixtures/negatigeImput.json'
import Selectors from '../fixtures/Selectors.json'


beforeEach(() => {
  cy.visit('/')
})

describe('Adminka', () => {
  it('valid input', () => {
    cy.contains(Selectors.TextAdmin).should('be.visible')
  })
  autozization.forEach(element => {
    it(element.positiveTest, () => {
      cy.contains(Selectors.email).type(`${element.LoginAndPassword.login}`).click()
      cy.contains(Selectors.password).type(`${element.LoginAndPassword.password}`).click()
      cy.get(Selectors.buttonLogin).click()
      cy.url().should('include', 'https://qamid.tmweb.ru/admin/index.php')
      cy.contains(Selectors.TextHallManagement).should('be.visible')
    })
  })
  negativeAutozization.forEach(element => {
    it(element.negativeTest, () => {
      cy.contains(Selectors.email).type(`${element.LoginAndPassword.login}`).click()
      cy.contains(Selectors.password).type(`${element.LoginAndPassword.password}`).click()
      cy.get(Selectors.buttonLogin).click()
      cy.url().should('include', 'https://qamid.tmweb.ru/admin/scripts/authorization.php')
      cy.contains('Ошибка авторизации!').should('be.visible')
    })
   })
})
