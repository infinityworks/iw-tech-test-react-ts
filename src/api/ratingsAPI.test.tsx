import { enableFetchMocks } from "jest-fetch-mock";
import { getAuthorities, getEstablishment, getEstablishmentByAuthority, getEstablishmentRatings } from "./ratingsAPI";
import fetch from "jest-fetch-mock";

enableFetchMocks();

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    const pageNum = 1;
    const expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    const actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`
    );
  });

  it("should call the establishment API with the provided ID and return the data", async () => {
    // Given
    const id = "197";
    const expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));

    // When
    const actual = await getEstablishment(id);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/${id}`
    );
  });

  it("should call the authorities API and return the data", async () => {
    // Given
    const expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));

    // When
    const actual = await getAuthorities();

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Authorities`
    );
  });

  it("should call the establishment by authority API with the provided localAuthorityId and page number, and return the data", async () => {
    // Given
    const localAuthorityId = "123";
    const pageNum = 1;
    const expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));

    // When
    const actual = await getEstablishmentByAuthority(localAuthorityId, pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${localAuthorityId}&pageNumber=${pageNum}&pageSize=10`
    );
  });
});
