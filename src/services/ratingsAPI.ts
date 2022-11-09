export type EstablishmentsType = {
  establishments: {
    FHRSID: number;
    LocalAuthorityBusinessID: string;
    BusinessName: string;
    BusinessType: string;
    RatingValue: string;
    RatingDate: string;
    links: [
      {
        rel: string;
        href: string;
      }
    ];
  }[];
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
