import { fetchData } from "./fetchData";

interface RatingsResponse extends ApiResponse {
  establishments: EstablishmentDetailDto[];
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

export const getRatingsByAuthority = (params: Params) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value);
    }
  }
  const urlParams = searchParams.toString();
  return fetchData<RatingsResponse>(
    `http://api.ratings.food.gov.uk/Establishments?${urlParams}`,
    { headers: { "x-api-version": "2" } }
  );
};
