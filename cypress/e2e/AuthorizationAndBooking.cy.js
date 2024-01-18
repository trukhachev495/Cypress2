import autozization from '../fixtures/LoginAndPassword.json'
import negativeAutozization from '../fixtures/negatigeImput.json'
import Selectors from '../fixtures/Selectors.json'
import seats from '../fixtures/seats.json'

beforeEach(() => {
  cy.visit('/')
})

describe('Adminka', () => {
  it('valid input', () => {
    cy.contains(Selectors.TextAdmin).should('be.visible')
  })
  autozization.forEach(element => {
    it(element.positiveTest, () => {
      cy.contains(Selectors.email)
        .type(`${element.LoginAndPassword.login}`)
        .click()
      cy.contains(Selectors.password)
        .type(`${element.LoginAndPassword.password}`)
        .click()
      cy.get(Selectors.buttonLogin).click()
      cy.url().should('include', 'https://qamid.tmweb.ru/admin/index.php')
      cy.contains(Selectors.TextHallManagement).should('be.visible')
    })
  })
  negativeAutozization.forEach(element => {
    it(element.negativeTest, () => {
      cy.contains(Selectors.email)
        .type(`${element.LoginAndPassword.login}`)
        .click()
      cy.contains(Selectors.password)
        .type(`${element.LoginAndPassword.password}`)
        .click()
      cy.get(Selectors.buttonLogin).click()
      cy.url().should(
        'include',
        'https://qamid.tmweb.ru/admin/scripts/authorization.php'
      )
      cy.contains('Ошибка авторизации!').should('be.visible')
    })
  })
  autozization.forEach(element => {
    it('to book a movie in an available hall, the name of which you receive from the admin panel', () => {
      cy.contains(Selectors.email)
        .type(`${element.LoginAndPassword.login}`)
        .click()
      cy.contains(Selectors.password)
        .type(`${element.LoginAndPassword.password}`)
        .click()
      cy.get(Selectors.buttonLogin).click()
      cy.url().should('include', 'https://qamid.tmweb.ru/admin/index.php')
      cy.contains(Selectors.TextHallManagement).should('be.visible')
      cy.get('h3.conf-step__movie-title:contains("Микки маус")')
        .invoke('text')
        .then(text => {
          cy.visit('https://qamid.tmweb.ru/client/index.php')
          cy.get('.page-nav__day:nth-child(6)').click()
          cy.get('.movie__title:contains("Микки маус")').should(
            'have.text',
            text
          )
          cy.get('.movie:nth-child(2)').contains('11:00').click()
          seats.forEach(element => {
            cy.get(
              `.buying-scheme__wrapper > :nth-child(${element.row}) > :nth-child(${element.seat})`
            ).click()
          })
          cy.contains('Забронировать').click()
        })
    })
  })
})
