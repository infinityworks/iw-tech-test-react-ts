import { useFetch } from "./useFetch";

export const useFetchEstablishment = (id: string) => {
  return useFetch<EstablishmentDetailDto>(
    `http://api.ratings.food.gov.uk/Establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  );
};
