/// <reference types="cypress" />

context('Cypress.Commands', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[data-cy=submit-input]`)
      .type("cat");
    cy.get(`[data-cy=submit]`)
      .should('be.visible')
      .click();   
    cy.get(`.cards-holder > :nth-child(5)`)
    .should('contain', 'http.cat')
    .click() 
  })

  it("should display general repo information plus have a github link on the repo card", () => {

    cy.get(`[data-cy=single-repo-container]`)
      .should('contain', "httpcats/http.cat")
      .and('contain', 'author: httpcats')
      .and('contain', ':cat: HTTP Cats API')
      .and('contain', 'Language: JavaScript')
    cy.get('[data-cy=github-icon]')
      .find('a').should("have.attr", "href", "https://github.com/httpcats/http.cat");
  })

  it("should allow users to return to the main screen by clicking on the arrow button", () => {

    cy.get('[data-cy=arrow-button]')
      .should('be.visible')
      .click()

    cy.get(`[data-cy=single-repo-container]`)
      .should('not.exist')
    cy.get(`[data-cy=header-wrap]`)
      .should('be.visible')
    cy.get(`[data-cy=repo-list-container]`)
      .should(`be.visible`)
  })
})