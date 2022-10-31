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

const api = process.env.REACT_APP_API_BASE_URL;
const param = {
  headers: { "x-api-version": "2" },
};

export function getAuthorities(): Promise<AuthoritiesType> {
  return fetch(`${api}/Authorities/basic`, param).then((res) => res.json());
}

export function getCountries(): Promise<any> {
    return fetch(`${api}/Countries/basic`, param).then((res) => res.json());
  }