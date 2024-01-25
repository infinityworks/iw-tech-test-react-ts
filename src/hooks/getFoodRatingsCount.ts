import { EstablishmentType } from 'api/establishments/establishmentsAPI';

export const getFoodRatingsCount = (establishments: EstablishmentType[]) => {
	const countedRatings = Object.create(null);
	establishments.forEach((est) => {
		const rate = est.RatingValue;
		const currCount = countedRatings[rate] ?? 0;
		countedRatings[rate] = currCount + 1;
	});

	return countedRatings;
};