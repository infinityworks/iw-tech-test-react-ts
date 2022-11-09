import fetch from "jest-fetch-mock";
import { getAuthorities, getCountries } from "../../services/filterApi";

const api = process.env.REACT_APP_API_BASE_URL;

describe("Authorities API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the get Authorities api returns the data", async () => {
    // Given
    const expected = {
      EstablishmentCount: 2141,
      LocalAuthorityId: 197,
      LocalAuthorityIdCode: "760",
      Name: "Aberdeen City",
      SchemeType: 2,
    };
    fetch.mockResponseOnce(JSON.stringify({ authorities: [expected] }), {
      status: 200,
    });
    // When
    let actual = await getAuthorities();
    // Then
    expect(actual.authorities[0]).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${api}/Authorities/basic`);
  });
});

describe("getCountries API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the get getCountries api returns the data", async () => {
    // Given
    const expected = {
      code: "",
      id: 1,
      links: [
        { rel: "self", href: "http://api.ratings.food.gov.uk/countries/1" },
      ],
      name: "England",
      nameKey: "England",
    };
    fetch.mockResponseOnce(JSON.stringify({ countries: [expected] }), {
      status: 200,
    });
    // When
    let actual = await getCountries();
    // Then
    expect(actual.countries[0]).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${api}/Countries/basic`);
  });
});
