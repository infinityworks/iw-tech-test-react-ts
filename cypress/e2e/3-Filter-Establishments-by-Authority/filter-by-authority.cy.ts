/// <reference types="cypress" />

describe("3-Filter-Establishments-by-Authority", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/Authorities/basic/").as("getAuthorities");
    cy.intercept(
      "GET",
      "**/Establishments?pageNumber=1&localAuthorityId=**"
    ).as("getFilteredEstablishments");
  });

  it("When the user clicks the Authority drop-down box on home page there is a list of Authorities", () => {
    cy.wait("@getAuthorities").then((xhr) => {
      const responseDataToCheck = xhr.response?.body.authorities.map(
        ({ LocalAuthorityId, Name }) => [`${LocalAuthorityId}`, Name]
      );
      cy.get("select option").then((options) => {
        const actual = [...options].map((o) => [o.value, o.textContent]);
        expect(actual).to.deep.eq([
          ["Select authority...", "Select authority..."],
          ...responseDataToCheck,
        ]);
      });
    });
  });

  it("When the user has clicked the Authority drop-down box. Establishements are filtered by Authority", () => {
    cy.get("select").select(2);
    cy.get("select option:selected")
      .invoke("attr", "value")
      .then((selectedID) => {
        cy.wait("@getFilteredEstablishments").then((xhr) => {
          expect(xhr.request.url).to.include(
            `/Establishments?pageNumber=1&localAuthorityId=${selectedID}`
          );

          const expetedDataInTable = xhr.response?.body.establishments.map(
            ({ BusinessName, RatingValue }) => [BusinessName, RatingValue, ""]
          );
          cy.get("table tbody")
            .table()
            .then((dataInTable) => {
              expect(dataInTable).to.deep.equal(expetedDataInTable);
            });
        });
      });
  });
});
