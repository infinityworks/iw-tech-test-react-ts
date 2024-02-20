import { Country } from "../types";
import { EnglishRatingMappingService, RatingMappingService, ScottishRatingMappingService } from "./RatingMappingService";

export class RatingMappingServiceFactory {
    static createFor(country: Country): RatingMappingService {
        switch(country) {
            case "England":
                return new EnglishRatingMappingService();
            case "Scotland":
                return new ScottishRatingMappingService();
            default:
                throw new Error("Unknown country");
        }
    }
}