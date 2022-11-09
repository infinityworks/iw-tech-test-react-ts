export type EstablishmentsType = {
  establishments: {
    FHRSID: number;
    ChangesByServerID: number;
    LocalAuthorityBusinessID: string;
    BusinessName: string;
    BusinessType: string;
    BusinessTypeID: number;
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    AddressLine4: string;
    PostCode: string;
    Phone: string;
    RatingValue: string;
    RatingKey: string;
    RatingDate: string;
    LocalAuthorityCode: string;
    LocalAuthorityName: string;
    LocalAuthorityWebSite: string;
    LocalAuthorityEmailAddress: string;
    scores: {
      Hygiene: null | number | string;
      Structural: null | number | string;
      ConfidenceInManagement: null | number | string;
    };
  };
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
  return fetch(`${api}/Establishments/list?id=${id}`, {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}
