export type CountriesType = {
  countries: Country[];
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

export type Country = {
  code: string;
  id: number;
  links: [{ rel: string; href: string }];
  name: string;
  nameKey: string;
};
