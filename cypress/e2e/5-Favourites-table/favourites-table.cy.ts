/// <reference types="cypress" />

describe("5-Favourites-table", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/Establishments/basic/1/10").as("getEstablishments");
    cy.intercept("GET", "**/Establishments/1549111").as(
      "getEstablishmentDetail"
    );
  });

  it.skip("When the user check checkbox establishment is added to favourites if uncheck it is removed, remove button in favourite table removes item from favourites", () => {
    cy.wait("@getEstablishments").then(() => {
      cy.get("input[type=checkbox]").eq(0).click();
      cy.get("input[type=checkbox]").eq(0).should("be.checked");
      cy.get("input[type=checkbox]").eq(2).click();
      cy.get("input[type=checkbox]").eq(2).should("be.checked");

      cy.get("table tbody")
        .eq(0)
        .table(0, 0, 2)
        .then((mainRows) => {
          cy.get("table tbody")
            .eq(1)
            .table(0, 0, 2)
            .then((favouriteRows) => {
              expect(favouriteRows).to.deep.equal([mainRows[0], mainRows[2]]);
            });
        });

      cy.get("input[type=checkbox]").eq(0).click();

      cy.get("input[type=checkbox]").eq(0).should("not.be.checked");

      cy.get("table tbody")
        .eq(0)
        .table(0, 0, 2)
        .then((mainRows) => {
          cy.get("table tbody")
            .eq(1)
            .table(0, 0, 2)
            .then((favouriteRows) => {
              expect(favouriteRows).to.deep.equal([mainRows[2]]);
            });
        });
      cy.get("button").contains("Remove").click();
      cy.get("table tbody")
        .eq(1)
        .table(0, 0, 2)
        .then((favouriteRows) => {
          expect(favouriteRows).to.deep.equal([]);
        });

      cy.get("input[type=checkbox]").eq(2).should("not.be.checked");
    });
  });

  it("This table should appear on all subsequent pages", () => {
    cy.wait("@getEstablishments");
    cy.get("input[type=checkbox]").eq(0).click();
    cy.get("table tbody")
      .eq(0)
      .table(0, 0, 2)
      .then((mainRows) => {
        cy.get(".establishment-table a").first().click();
        cy.get("table tbody")
          .eq(0)
          .table(0, 0, 2)
          .then((favouriteRows) => {
            expect(favouriteRows).to.deep.equal([mainRows[0]]);
          });
      });
  });
});
