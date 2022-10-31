export type EstablishmentsType = {
  establishment: {};
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

export function getEstablishmentDetail(
  id: string
): Promise<EstablishmentsType> {
  return fetch(`${api}/Establishment/${id}`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}
