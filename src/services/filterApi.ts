import { AuthoritiesType } from "../types/Authority";
import { CountriesType } from "../types/Country";

const api = process.env.REACT_APP_API_BASE_URL;
const param = {
  headers: { "x-api-version": "2" },
};

export function getAuthorities(): Promise<AuthoritiesType> {
  return fetch(`${api}/Authorities/basic`, param).then((res) => res.json());
}

export function getCountries(): Promise<CountriesType> {
  return fetch(`${api}/Countries/basic`, param).then((res) => res.json());
}
