interface EstablishmentDetailDto {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  ChangesByServerID: number;
  Distance: null;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  LocalAuthorityCode: string;
  LocalAuthorityEmailAddress: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  NewRatingPending: boolean;
  Phone: string;
  PostCode: string;
  RatingDate: string;
  RatingKey: string;
  RatingValue: string;
  RightToReply: string;
  SchemeType: string;
  geocode: Geocode;
  scores: Scores;
}

interface Geocode {
  longitude: string;
  latitude: string;
}

interface Scores {
  Hygiene: null;
  Structural: null;
  ConfidenceInManagement: null;
}
