/// <reference types="cypress" />
import { format } from "date-fns";

describe("4 Establishments link to their detail page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/Establishments/basic/1/10").as("getEstablishments");
    cy.intercept("GET", "**/Establishments/1549111").as(
      "getEstablishmentDetail"
    );
  });

  it("When the user clicks on an Establishment's name get redirected to detail page with title address rate and date.", () => {
    cy.wait("@getEstablishments");
    cy.get(".establishment-table a")
      .first()
      .should("have.attr", "href")
      .and("include", `/establishment/`);
    cy.get(".establishment-table a").first().click();

    cy.wait("@getEstablishmentDetail").then((xhr) => {
      const title = xhr.response?.body.BusinessName;
      const FHRSID = xhr.response?.body.FHRSID;
      const AddressLine1 = xhr.response?.body.AddressLine1;
      const AddressLine2 = xhr.response?.body.AddressLine2;
      const AddressLine3 = xhr.response?.body.AddressLine3;
      const AddressLine4 = xhr.response?.body.AddressLine4;
      const RatingValue = xhr.response?.body.RatingValue;
      const RatingDate = xhr.response?.body.RatingDate;

      cy.url().should(
        "include",
        `${Cypress.config("baseUrl")}/establishment/${FHRSID}`
      );
      cy.get("h1").should("exist").should("have.text", title);
      cy.get("address")
        .should("exist")
        .should("contain.text", AddressLine1)
        .should("contain.text", AddressLine2)
        .should("contain.text", AddressLine3)
        .should("contain.text", AddressLine4);
      cy.get('[data-cy="rating"]')
        .should("exist")
        .should("contain.text", `Rating: ${RatingValue}`);
      cy.get('[data-cy="rating-date"]')
        .should("exist")
        .should(
          "contain.text",
          `Date: ${format(new Date(RatingDate), "dd/MM/yy")}`
        );
    });
  });

  it("When the user clicks on an Establishment's name get redirected to detail page with back button.", () => {
    cy.wait("@getEstablishments");
    cy.get(".establishment-table a")
      .first()
      .should("have.attr", "href")
      .and("include", `/establishment/`);
    cy.get(".establishment-table a").first().click();
    cy.url().should("include", `${Cypress.config("baseUrl")}/establishment/`);
    cy.get("button").should("have.text", "Go Back").click();
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
  });
});
