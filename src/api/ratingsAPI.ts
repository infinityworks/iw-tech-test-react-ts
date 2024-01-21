import {CONST} from "../utils/constants";
import {EstablishmentsType, LocalAuthorityType} from "./types";

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `${CONST.BASE_URL}/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getLocalAuthority(
    pageNum: number
): Promise<LocalAuthorityType> {
  return fetch(
      `${CONST.BASE_URL}/authorities/basic/${pageNum}/1`,
      { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getRatingsInLocalAuthority(
    localAuthorityId: number,
    schemeTypeKey: string,
    ratingKey: number,
): Promise<EstablishmentsType> {
  return fetch(
      `${CONST.BASE_URL}/establishments/?localAuthorityId=${localAuthorityId}&schemeTypeKey=${schemeTypeKey}&ratingKey=${ratingKey}`,
      { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
