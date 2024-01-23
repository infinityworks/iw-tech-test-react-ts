import {CONST} from "../utils/constants";
import {EstablishmentsType, LocalAuthorityType} from "./types";

const apiVersion = {"x-api-version": "2"};

export function getEstablishmentRatings(
    pageNum: number
): Promise<EstablishmentsType> {
    return fetch(
        `${CONST.BASE_URL}/Establishments/basic/${pageNum}/10`,
        {headers: apiVersion}
    ).then((res) => res.json());
}

export function getLocalAuthority(
    pageNum: number
): Promise<LocalAuthorityType> {
    return fetch(
        `${CONST.BASE_URL}/authorities/basic/${pageNum}/1`,
        {headers: apiVersion}
    ).then((res) => res.json());
}

export function getRatingsInLocalAuthority(
    localAuthorityId: number,
    schemeTypeKey: string,
    ratingKey: string,
): Promise<EstablishmentsType> {
    return fetch(
        `${CONST.BASE_URL}/establishments/?localAuthorityId=${localAuthorityId}&schemeTypeKey=${schemeTypeKey}&ratingKey=${ratingKey}`,
        {headers: apiVersion}
    ).then((res) => {
        console.log('Fetch result:', res);
        return res.json();

    }).catch((error) => {
        console.error('Fetch failed:', error);
        throw error;
    });
}

export function getAuthoritySchemeType(
    localAuthorityId: number,
    schemeTypeKey: string,
): Promise<EstablishmentsType> {
    return fetch(
        `${CONST.BASE_URL}/establishments/?localAuthorityId=${localAuthorityId}&schemeTypeKey=${schemeTypeKey}`,
        {headers: apiVersion}
    ).then((res) => res.json());
}