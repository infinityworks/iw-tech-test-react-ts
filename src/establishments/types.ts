export type Establishment = {
    BusinessName: string;
    RatingValue: string;
    [key: string]: string;
}

export type NullableEstablishments = Establishment[] | null | undefined;

export type Country = "England" | "Scotland";

export type SchemeTypeKey = "FHRS" | "FHIS";