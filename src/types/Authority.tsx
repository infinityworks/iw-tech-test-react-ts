export type AuthoritiesType = {
  authorities: Authority[];
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
  links: {
    rel: string;
    href: string;
  }[];
};

export type Authority = {
  EstablishmentCount: number;
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  SchemeType: number;
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};
