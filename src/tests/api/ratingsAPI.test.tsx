import fetch from "jest-fetch-mock";
import {
  getEstablishmentRatings,
  getFilteredEstablishmentRatings,
} from "../../services/ratingsAPI";

const api = process.env.REACT_APP_API_BASE_URL;

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `${api}/Establishments/basic/${pageNum}/10`
    );
  });

  it("call the ratings api with bigger page number that we can and returns the data", async () => {
    // Given
    let pageNum = 100000;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `${api}/Establishments/basic/${pageNum}/10`
    );
  });
});

describe("Filtered Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    const expected = { testing: "test" };
    const pageNum = 1;
    const localAuthorityId = "197";
    const countryId = "1";
    fetch.mockResponseOnce(JSON.stringify(expected), {
      status: 200,
    });
    // When
    let actual = await getFilteredEstablishmentRatings(
      pageNum,
      localAuthorityId,
      countryId
    );

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `${api}/Establishments?pageSize=${pageNum}&localAuthorityId=${localAuthorityId}&countryId=${countryId}`
    );
  });

  it("call the ratings api with the bigger page number and returns the data", async () => {
    // Given
    const expected = { testing: "test" };
    const pageNum = 10000;
    const localAuthorityId = "197";
    const countryId = "1";
    fetch.mockResponseOnce(JSON.stringify(expected), {
      status: 200,
    });
    // When
    let actual = await getFilteredEstablishmentRatings(
      pageNum,
      localAuthorityId,
      countryId
    );

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `${api}/Establishments?pageSize=${pageNum}&localAuthorityId=${localAuthorityId}&countryId=${countryId}`
    );
  });
});
