import { fetchData } from "./fetchData";

export const getEstablishment = (id: string) => {
  return fetchData<EstablishmentDetailDto>(
    `http://api.ratings.food.gov.uk/Establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  );
};
