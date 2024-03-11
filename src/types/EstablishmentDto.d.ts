interface EstablishmentDto {
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  RatingValue: string;
  RatingDate: Date;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}
