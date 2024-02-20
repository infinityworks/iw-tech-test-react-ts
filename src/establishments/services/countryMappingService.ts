import { Country, SchemeTypeKey } from "../types"

export const mapCountryToId = (country: Country): number => {
    return country === "England"
        ? 1
        : 3;
};

export const mapCountryToSchemeTypeKey = (country: Country): SchemeTypeKey => {
    return country === "England"
        ? "FHRS"
        : "FHIS";
}