import { useFetch } from "./useFetch";

interface RatingsResponse extends ApiResponse {
  establishments: EstablishmentsByAuthorityDto[];
}

interface Params {
  name?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  maxDistanceLimit?: number;
  businessTypeId?: string;
  schemeTypeKey?: string;
  ratingKey?: string;
  ratingOperatorKey?: string;
  localAuthorityId: string;
  countryId?: string;
  sortOptionKey?: string;
  pageNumber: number;
  pageSize: number;
}

export const useFetchRatingsByAuthority = (params: Params) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value);
    }
  }
  const urlParams = searchParams.toString();
  console.log(urlParams);
  return useFetch<RatingsResponse>(
    `http://api.ratings.food.gov.uk/Establishments?${urlParams}`,
    { headers: { "x-api-version": "2" } }
  );
};
