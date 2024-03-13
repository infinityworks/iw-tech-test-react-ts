import { useFetch } from "./useFetch";

interface RatingsResponse extends ApiResponse {
  establishments: EstablishmentDto[];
}

export const useFetchRatings = (pageNum: number) => {
  return useFetch<RatingsResponse>(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  );
};
