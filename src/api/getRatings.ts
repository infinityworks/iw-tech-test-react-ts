import { fetchData } from "./fetchData";

interface RatingsResponse extends ApiResponse {
  establishments: EstablishmentDto[];
}

export const getRatings = (pageNum: number) => {
  return fetchData<RatingsResponse>(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  );
};
