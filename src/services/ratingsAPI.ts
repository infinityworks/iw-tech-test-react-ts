import { EstablishmentsType } from "../types/Establishment";

const api = process.env.REACT_APP_API_BASE_URL;
const headers = {
  headers: { "x-api-version": "2" },
};
export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(`${api}/Establishments/basic/${pageNum}/10`, headers).then(
    (res) => res.json()
  );
}

export function getFilteredEstablishmentRatings(
  pageNum: number,
  localAuthorityId: string,
  countryId: string
): Promise<EstablishmentsType> {
  return fetch(
    `${api}/Establishments?pageSize=${pageNum}&localAuthorityId=${localAuthorityId}&countryId=${countryId}`,
    headers
  ).then((res) => res.json());
}
