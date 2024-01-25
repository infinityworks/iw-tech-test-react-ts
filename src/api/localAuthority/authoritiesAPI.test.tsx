import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { useGetAuthoritiesApi } from './authoritiesAPI';
//import { useGetAuthorityByIdApi } from "./authoritiesByIdAPI";

enableFetchMocks();

describe('Authority API', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it.skip('call the get Authorities Basic api with the provided page number and returns the data', async () => {
		// Given
		let pageNum = 1;
		let expected = { testing: 'test' };
		fetch.mockResponseOnce(JSON.stringify(expected));
		// When
		let actual = useGetAuthoritiesApi(pageNum);

		expect(actual).toEqual(expected);
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(
			`http://api.ratings.food.gov.uk/Authorities/basic/${pageNum}/10`,
		);
	});
	it.todo(
		'call the get Authorities with Id and return a single authority data',
	);
});
