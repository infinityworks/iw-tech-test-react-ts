interface EstablishmentDto {
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  RatingValue: string;
  RatingDate: Date;
  links: LinkDto[];
}
