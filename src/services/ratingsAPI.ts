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
const api = process.env.REACT_APP_API_BASE_URL;

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(`${api}/Establishments/basic/${pageNum}/10`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}

export function getFilteredEstablishmentRatings(
  pageNum: number,
  localAuthorityId: string,
  countryId: string
): Promise<EstablishmentsType> {
  return fetch(
    `${api}/Establishments?pageSize=${pageNum}&localAuthorityId=${localAuthorityId}&countryId=${countryId}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
