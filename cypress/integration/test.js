// / <reference types="Cypress" />

context('Test', () => {
  beforeEach(() => {
    cy.viewport(300, 600).visit('http://localhost:8000');
  });

  it('page contain github link', () => {
    cy.get('.header a')
      .should('have.attr', 'href')
      .and('include', 'github');
  });

  it('overflow color wrap background is white', () => {
    cy.get('[data-oc-wrap]').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('html first background is red', () => {
    cy.get('html').should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('html page end background is blue', () => {
    cy.get('p:last-of-type').scrollIntoView();
    cy.get('html').should('have.css', 'background-color', 'rgb(0, 0, 255)');
  });

  it('html page top background is blue', () => {
    cy.get('p:last-of-type').scrollIntoView();
    cy.scrollTo(0);
    cy.get('html').should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('update body attribute', () => {
    cy.get('body').invoke('attr', 'data-oc', 'lime,yellow');
    cy.scrollTo(0);
    cy.window()
      .then(
        win => new Cypress.Promise(resolve => {
          win.updateOverflowColor();
          resolve();
        })
      )
      .then(() => {
        cy.get('html').should('have.css', 'background-color', 'rgb(0, 255, 0)');
        cy.get('p:last-of-type').scrollIntoView();
        cy.get('html').should('have.css', 'background-color', 'rgb(255, 255, 0)');
      });
  });
});
