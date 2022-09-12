export type Establishment = {
  BusinessName: string;
  BusinessType: string;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  RatingDate: string;
  RatingValue: string | number;
}

export type EstablishmentsType = {
  establishments: Array<Establishment>;
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

export type Authority = {
  EstablishmentCount: number
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  SchemeType: number;
}

const commonApiHeaders = {
  "x-api-version": "2"
};

const DEFAULT_PAGE_SIZE = 10;

export function getEstablishmentRatings(pageNum: number): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/${DEFAULT_PAGE_SIZE}`,
    { headers: commonApiHeaders }
  ).then((res) => res.json());
}

export function getFilteredEstablishmentRatings(pageNum: number, authorityId: string): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=${DEFAULT_PAGE_SIZE}&localAuthorityId=${authorityId}`,
    { headers: commonApiHeaders }
  ).then((res) => res.json());
}

export function getAuthorities() {
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities/basic`,
    { headers: commonApiHeaders }
  ).then((res) => res.json());
}
