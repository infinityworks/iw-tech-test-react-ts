import { EstablishmentsType } from "../types/Establishment";
const api = process.env.REACT_APP_API_BASE_URL;

export function getEstablishmentDetail(
  id: string
): Promise<EstablishmentsType> {
  return fetch(`${api}/Establishments/list?id=${id}`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}
