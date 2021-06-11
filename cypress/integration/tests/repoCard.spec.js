/// <reference types="cypress" />

context('Cypress.Commands', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[data-cy=submit-input]`)
      .type("cat");
    cy.get(`[data-cy=submit]`)
      .should('be.visible')
      .click();    
  })

  it("should display extra tip if the total amount of repos exceeds 1000", () => {

    cy.get(`[data-cy=repo-list-container]`)
      .contains( 
    'The search displays only up tp 1,000 results. To help us to narrow down your search please provide us a little more infromation!'
    )
  })

  it("should display the total of all repos and display 30 per page", () => {

    cy.get(`[data-cy=repo-list-container]`)
      .should(`be.visible`)
    cy.get(`.cards-holder`)
      .find(`[data-cy=repo-card]`)
      .should('have.length', 30)
    cy.get(`.cards-holder`)
      .find(`[data-cy=star-icon]`)
      .should('have.length', 30)
  })

  it("should display maximun 34 pages due to the limit of 1000 results", () => {
    
    cy.get('.MuiPagination-ul')
      .contains(':nth-child(5) > .MuiButtonBase-root', 34)
    cy.get('.MuiPagination-ul').should('exist')
      .contains(':nth-child(6) > .MuiButtonBase-root', 35)
      .should('not.exist')
  })

  it("should display repo name, author, star count, language on the repo card", () => {
    
    cy.get(`.cards-holder > :nth-child(1)`)
      .should('contain', 'cat')
      .and('contain', 'dianping')
      .and('contain', 'Java')
    })
})