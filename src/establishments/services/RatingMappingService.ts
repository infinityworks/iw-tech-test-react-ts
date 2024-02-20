export abstract class RatingMappingService {
    abstract convert(rating: string): string;
}

export class EnglishRatingMappingService extends RatingMappingService {
    convert(rating: string): string {
        switch(rating) {
            case "5":
                return "50%";
            case "4":
            case "3":
            case "2":
                return "0%";
            case "1":
                return "20%";
            case "0":
                return "Unspecified%";
            case "Exempt":
                return "30%";
            default:
                return "Unknown rating";
        }
    }
}

export class ScottishRatingMappingService extends RatingMappingService {
    convert(rating: string): string {
        switch(rating) {
            case "Pass and Eat Safe":
                return "50%";
            case "Pass":
                return "15%";
            case "Improvement Required":
                return "35%";
            default:
                return "Unknown rating";
        }
    }
}