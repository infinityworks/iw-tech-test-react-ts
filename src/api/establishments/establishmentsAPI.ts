import { AdditionalProps, createAPIMethod } from 'utils';

export interface EstablishmentType extends AdditionalProps {
	FHRSID: number;
	LocalAuthorityBusinessID: string;
	BusinessName: string;
	RatingValue: string | number;
	RatingKey: string;
	SchemeType: string;
}

export type EstablishmentsType = {
	establishments: EstablishmentType[];
	meta: {
		dataSource: string;
		extractDate: string;
		itemCount: number;
		returnCode: string;
		totalCount: number;
		totalPages: number;
		pageSize: number;
		pageNumber: number;
	};
	links: [
		{
			rel: string;
			href: string;
		},
	];
};

export async function getEstablishments(
	pageNum: number,
): Promise<EstablishmentsType> {
	const query = createAPIMethod<EstablishmentsType>({
		url: `Establishments/basic/${pageNum}/10`,
	});
	return query();
}

// GetAuthorityById provided by the Establishment local authority id
// Collect all the rating values for all the establishment withing a specific authority and return
/** @Establishment
 * local authority code
 * local authority name
 * local authority business id -? authority id?
 * @Rating info
 * rating value
 * rating key - is this the rating scheme? FHIS vs FHRS data
 * scheme type? - rating scheme? FHIS vs FHRS data
 */

/** @Rating
 * rating Id
 * rating Name
 * rating Key
 * scheme type id
 */

/** @Scheme
 * scheme type id
 * scheme type name
 * scheme type key
 */

/** @Authority
 * local authority id
 * local authority id code
 * name
 * scheme type
 * establishment count
 */

/** @Objective
 * As a user, access authority list
 * @Details
 * Number of establishements
 * food hygiene ratings - computed from all the establishments
 * food hygiene ratings are displayed in order - descending order.
 * tests to add
 */

/** @Logic
 * Merge info from establishments, authorities, schemes and ratings
 */

/** @Known
 * getEstablishmentRatings returns list of establishments with size of 10
 * There are 2 ratings of interest : FHIS vs FHRS - get list of ratiings from ratings api
 * Each establishment has a rating value
 * To calculate the percentage for each establishment determine the which rating it is based on
 * * Get establishment by id more info about rating value, rating key
 * * Rating value can a number of string 'AwaitingInspection
 * * @Unknows rating api ahs scheme type, and scheme type can be wither FHIS or FHRS? ToDo
 * For each authority, get all the establishments within and their ratings, rating scheme and return summarized results
 * for the food rating
 */

/** @Routing
 * React router
 * local authorities page
 * authority detail view
 * establishment list view
 * establishment detail view
 * Propose root path to be the authorities list view: Authority | Establishment
 * Add header
 */

/** @Packages
 * Tailwind for styling
 * Prettier for formatting
 * Configure path aliases
 */
