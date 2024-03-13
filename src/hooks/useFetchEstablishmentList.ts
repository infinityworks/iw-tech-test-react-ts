import { useFetch } from "./useFetch";

interface EstablishmentListResponse extends ApiResponse {
  establishments: EstablishmentDetailDto[];
}

export const useFetchEstablishmentList = (ids: number[]) => {
  const searchParams = new URLSearchParams();

  ids.forEach((id) => {
    searchParams.append("id", `${id}`);
  });

  const urlParams = searchParams.toString();
  return useFetch<EstablishmentListResponse>(
    `http://api.ratings.food.gov.uk/Establishments/list?${urlParams}`,
    { headers: { "x-api-version": "2" } }
  );
};
