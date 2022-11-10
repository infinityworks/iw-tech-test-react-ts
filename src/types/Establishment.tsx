export type EstablishmentDetail = {
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

export type Establishment = {
  isFavorite: boolean;
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
};
