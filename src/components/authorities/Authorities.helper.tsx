import {RatingFH, RatingPercentageFH} from "./Authorities.types";

export function calculatePercentageRating(ratings: RatingFH[]): RatingPercentageFH[] {
    const totalCount = ratings.reduce((sum, rating) => sum + rating.count, 0);
    const percentageByRating: RatingPercentageFH[] = ratings.map((rating) => ({
        rate: rating.rate,
        percentage: rating.count === 0 ? 0 : Math.round((rating.count / totalCount) * 100),
    }));
    return percentageByRating;
}
