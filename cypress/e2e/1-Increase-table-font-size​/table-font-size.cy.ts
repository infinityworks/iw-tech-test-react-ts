/// <reference types="cypress" />

describe("1 - Increase table font size", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Establishment names and their ratings should have a font size of 20 pixels", () => {
    // select table and test computed styles
    cy.get(".establishment-table")
      .then(($el) => {
        return window.getComputedStyle($el[0]);
      })
      .invoke("getPropertyValue", "font-size")
      .should("equal", "20px");
  });
});
