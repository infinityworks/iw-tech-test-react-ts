export type EstablishmentsType = {
  establishments: {}[];
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

export type AuthoritiesType = {
  authorities: {}[];
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

export type EstablishmentDetailType = {
    AddressLine1: string,
    AddressLine2: string,
    AddressLine3: string,
    AddressLine4: string,
    BusinessName: string,
    businessTypeID: number,
    FHRSID: number,
    localAuthorityBusinessID: string,
    PostCode: string,
    RatingDate: string,
    RatingValue: string,
    scores: {}
}

export async function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export async function getEstablishmentDetails(
  id: string | undefined
): Promise<EstablishmentDetailType> {
  return fetch(
    `http://api.ratings.food.gov.uk/establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export async function getAuthorities(): Promise<AuthoritiesType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export async function filterEstablishmentsByAuthority(
  authorityId: number,
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10&localAuthorityId=${authorityId}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}