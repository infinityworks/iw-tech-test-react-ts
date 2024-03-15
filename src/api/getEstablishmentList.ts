import { fetchData } from "./fetchData";

interface EstablishmentListResponse extends ApiResponse {
  establishments: EstablishmentDetailDto[];
}

export const getEstablishmentList = (ids: number[]) => {
  const searchParams = new URLSearchParams();

  ids.forEach((id) => {
    searchParams.append("id", `${id}`);
  });

  const urlParams = searchParams.toString();
  return fetchData<EstablishmentListResponse>(
    `http://api.ratings.food.gov.uk/Establishments/list?${urlParams}`,
    { headers: { "x-api-version": "2" } }
  );
};
