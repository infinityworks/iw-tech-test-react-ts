import { mapCountryToId, mapCountryToSchemeTypeKey } from "../services/countryMappingService";
import { Country, Establishment } from "../types";

export type EstablishmentsType = {
  establishments: Establishment[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};

export async function getEstablishmentRatingsBasic(
  pageNum: number
): Promise<EstablishmentsType> {
  const response = await fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  );
  return response.json();
}

export async function getEstablishmentRatingsComplex(
  pageNum: number,
  country: Country
): Promise<EstablishmentsType> {
  const response = await fetch(
    `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10&countryId=${mapCountryToId(country)}&sortOptionKey=rating&schemeTypeKey=${mapCountryToSchemeTypeKey(country)}`,
    { headers: { "x-api-version": "2" } }
  );
  return response.json();
}
