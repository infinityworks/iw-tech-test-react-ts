import { fetchData } from "./fetchData";

interface AuthoritiesResponse extends ApiResponse {
  authorities: AuthorityDto[];
}

export const getAuthorities = () => {
  return fetchData<AuthoritiesResponse>(
    `http://api.ratings.food.gov.uk/Authorities/basic/`,
    { headers: { "x-api-version": "2" } }
  );
};
