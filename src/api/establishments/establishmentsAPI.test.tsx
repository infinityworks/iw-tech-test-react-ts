import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { getEstablishments } from './establishmentsAPI';
//import { getEstablishmentById } from "./establishmentByIdAPI";
//import { useGetEstablishmentsByLocalAuthority } from "./establishmentsByLocalAuthority";

enableFetchMocks();

describe('Establishment API', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('call the get Establishment Basic api with the provided page number and returns the data', async () => {
		// Given
		let pageNum = 1;
		let expected = { testing: 'test' };
		fetch.mockResponseOnce(JSON.stringify(expected));
		// When
		let actual = await getEstablishments(pageNum);

		// Then
		expect(actual).toEqual(expected);
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(
			`http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
		);
	});
	it.todo(
		'call the get Establishment with provided search parameter localAuthorityId and returns data',
	);
	it.todo(
		'call the get Establishment with Id and returns a single establishment',
	);
});
