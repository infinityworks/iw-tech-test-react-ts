/// <reference types="cypress" />

describe("2 - Show  loading text when waiting loading the next page of data", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/Establishments/basic/**").as("getEstablishments");
  });

  it("When user visits home page should see loading text", () => {
    cy.get("table").contains("Loading ...").should("exist");
    cy.wait("@getEstablishments").then(() => {
      cy.get("table").contains("Loading ...").should("not.exist");
    });
  });
  it("When user navigate to next page in table see loading text", () => {
    cy.wait("@getEstablishments").then(() => {
      cy.get("table").contains("Loading ...").should("not.exist");
      cy.get("button").contains("+").click();
      cy.get("table").contains("Loading ...").should("exist");
      cy.wait("@getEstablishments").then(() => {
        cy.get("table").contains("Loading ...").should("not.exist");
      });
    });
  });
  it("When user navigate to previous page in table see loading text", () => {
    cy.wait("@getEstablishments").then(() => {
      cy.get("table").contains("Loading ...").should("not.exist");
      cy.get("button").contains("+").click();
      cy.get("table").contains("Loading ...").should("exist");
      cy.wait("@getEstablishments")
        .then(() => {
          cy.get("table").contains("Loading ...").should("not.exist");
          cy.get("button").contains("-").click();
          cy.get("table").contains("Loading ...").should("exist");
        })
        .then(() => {
          cy.wait("@getEstablishments").then(() => {
            cy.get("table").contains("Loading ...").should("not.exist");
          });
        });
    });
  });
});
