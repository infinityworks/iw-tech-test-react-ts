import fetch from "jest-fetch-mock";
import { getEstablishmentDetail } from "../../services/detailApi";

const api = process.env.REACT_APP_API_BASE_URL;

describe("Establishment Detail API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the get Establishment Detail api returns the data", async () => {
    // Given
    const id = "1549111";
    const expected = {
      FHRSID: 1549111,
      ChangesByServerID: 0,
      LocalAuthorityBusinessID: "201744",
      BusinessName: "' THE ARGENTINIAN ''",
      BusinessType: "Takeaway/sandwich shop",
      BusinessTypeID: 7844,
      AddressLine1: "Camden (Buck Street) Market",
      AddressLine2: "192-198 Camden High Street",
      AddressLine3: "",
      AddressLine4: "London",
      PostCode: "NW1 8QP",
      Phone: "",
      RatingValue: "AwaitingInspection",
      RatingKey: "fhrs_awaitinginspection_en-gb",
      RatingDate: "1901-01-01T00:00:00",
      LocalAuthorityCode: "506",
      LocalAuthorityName: "Camden",
      LocalAuthorityWebSite: "http://www.camden.gov.uk",
      LocalAuthorityEmailAddress: "foodsafety@camden.gov.uk",
      scores: {
        Hygiene: null,
        Structural: null,
        ConfidenceInManagement: null,
      },
    };

    fetch.mockResponseOnce(JSON.stringify({ establishments: expected }), {
      status: 200,
    });
    // When
    let actual = await getEstablishmentDetail(id);
    // Then
    expect(actual.establishments).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${api}/Establishments/list?id=${id}`);
  });
});
