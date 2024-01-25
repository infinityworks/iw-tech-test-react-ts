import { getFoodRatingsCount, useGetEstablishmentsByAuthority } from 'hooks';

interface GetFoodRatingsForAuthorityProps {
	localAuthorityId?: number;
	ratingSchemeId?: number;
}

const getFoodRatingPercentages = (
	foodRatingsCount: any,
	multiplier: number,
	ratingSchemeId?: number,
) => {
	let foodRatingSummary = {};

	switch (ratingSchemeId) {
		case 1:
			foodRatingSummary = {
				'1': foodRatingsCount['1']
					? (foodRatingsCount['1'] * multiplier).toFixed(2)
					: '0',
				'2': foodRatingsCount['2']
					? (foodRatingsCount['2'] * multiplier).toFixed(2)
					: '0',
				'3': foodRatingsCount['3']
					? (foodRatingsCount['3'] * multiplier).toFixed(2)
					: '0',
				'4': foodRatingsCount['4']
					? (foodRatingsCount['4'] * multiplier).toFixed(2)
					: '0',
				'5': foodRatingsCount['5']
					? (foodRatingsCount['5'] * multiplier).toFixed(2)
					: '0',
				'Awaiting Inspection': foodRatingsCount['AwaitingInspection']
					? (foodRatingsCount['AwaitingInspection'] * multiplier).toFixed(2)
					: '0',
				Exempt: foodRatingsCount['Exempt']
					? (foodRatingsCount['Exempt'] * multiplier).toFixed(2)
					: '0',
			};
			break;
		case 2:
			foodRatingSummary = {
				Pass: foodRatingsCount['Pass']
					? (foodRatingsCount['Pass'] * multiplier).toFixed(2)
					: '0',
				'Pass And Eat Safe': foodRatingsCount['Pass and Eat Safe']
					? (foodRatingsCount['Pass and Eat Safe'] * multiplier).toFixed(2)
					: '0',
				'Improvement Required': foodRatingsCount['Improvement Required']
					? (foodRatingsCount['Improvement Required'] * multiplier).toFixed(2)
					: '0',
				'Awaiting Inspection': foodRatingsCount['Awaiting Inspection']
					? (foodRatingsCount['Awaiting Inspection'] * multiplier).toFixed(2)
					: '0',
				Exempt: foodRatingsCount['Exempt']
					? (foodRatingsCount['Exempt'] * multiplier).toFixed(2)
					: '0',
			};
			break;
	}

	return foodRatingSummary;
};
export const GetFoodRatingsForAuthority = ({
	localAuthorityId,
	ratingSchemeId,
}: GetFoodRatingsForAuthorityProps) => {
	const { establishments } = useGetEstablishmentsByAuthority(
		localAuthorityId ?? -1,
	);
	const totalEstablishments = establishments.length;
	const multiplier = 100 / totalEstablishments;

	const foodRatingsCount = getFoodRatingsCount(establishments);
	let foodRatingsPercentageSummary = getFoodRatingPercentages(
		foodRatingsCount,
		multiplier,
		ratingSchemeId,
	);

	return (
		<div className="flex flex-col w-full bg-gray-500 rounded-md">
			<table className="table-fixed border-separate border border-gray-900 rounded-md p-4">
				<thead>
					<tr className="">
						<th className="text-left font-bold text-xl border border-gray-600 rounded-md p-1">
							Rating
						</th>
						<th className="text-left font-bold text-xl border border-gray-600 rounded-md p-1">
							Percentages
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(foodRatingsPercentageSummary).map((obj) => (
						<tr>
							<td className="border border-gray-600 rounded-md p-1">
								{obj[0]}
							</td>
							<td className="font-semibold border border-gray-600 rounded-md p-1">
								{obj[1]}%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
