export type Establishment = {
    BusinessName: string;
    RatingValue: string;
    [key: string]: string;
}

export type NullableEstablishments = Establishment[] | null | undefined;