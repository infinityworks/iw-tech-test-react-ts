import { useFetch } from "./useFetch";

interface AuthoritiesResponse extends ApiResponse {
  authorities: AuthorityDto[];
}

export const useFetchAuthorities = () => {
  return useFetch<AuthoritiesResponse>(
    `http://api.ratings.food.gov.uk/Authorities/basic/`,
    { headers: { "x-api-version": "2" } }
  );
};
