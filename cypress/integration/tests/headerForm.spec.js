/// <reference types="cypress" />

context('Cypress.Commands', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it("should have a landing page with title, search input and submit button", () => {
    cy.get(`[data-cy=header-wrap]`)
      .contains(`RepoFinder`)
    cy.get(`[data-cy=submit-input]`)
      .contains('Search...')
    cy.get(`[data-cy=submit]`)
      .should('be.visible')

    cy.get(`[data-cy=sort-filter-wrap]`)
      .should('not.exist')  
  })

  it("should accept user input and display new filter mode and results", () => {
    cy.get(`[data-cy=submit-input]`)
      .type("woman in code");

    cy.get(`[data-cy=submit]`)
      .should('be.visible')
      .click();  

    cy.get(`[data-cy=loading-container]`)
      .should('be.visible')
    cy.get(`[data-cy=sort-filter-wrap]`)
      .should('exist'); 
    cy.get(`[data-cy=select-languages-form]`) 
      .should('exist')
  })

  it("should have language select menu and display correct results", () => {
    cy.get(`[data-cy=submit-input]`)
      .type("woman in code");
    cy.get(`[data-cy=submit]`)
      .should('be.visible')
      .click();  
    cy.get(`[data-cy=select-language]`)
      .click()
    cy.get('li')
      .contains('Java')
      .click()
    cy.get(`#language`)
      .contains("Java")

    cy.get(`[data-cy=repo-list-container]`)
      .should('contain', `Total Count: 3`)

    cy.get(`[data-cy=repo-card]`)
      .should(`have.length`, 3)
    cy.get(`[data-cy=sort-filter-wrap]`)
      .find(`.MuiButtonBase-root`)
      .should(`have.length`, 3)
  })

  it("should have sort select menu and display correct results", () => {
    cy.get(`[data-cy=submit-input]`)
      .type("woman in code");
    cy.get(`[data-cy=submit]`)
      .should('be.visible')
      .click();  

    cy.get(`[data-cy=select-sort]`)
    cy.get(`#sortType`)
      .contains('Best Match')
      .should('be.visible')
  })
})
