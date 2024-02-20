import { Establishment } from "../establishments/types";

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

export async function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  const response = await fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  );
  return response.json();
}
