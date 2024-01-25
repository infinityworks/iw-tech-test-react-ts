import { useGetSchemeTypesById } from 'api/schemeType/schemeTypeByIdAPI';
import { GetFoodRatingsForAuthority } from 'components/GetFoodRatingsForAuthority';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PageBody } from 'ui/pageBody';
import { PageHeader } from 'ui/PageHeader';
import { useGetAuthorityByIdApi } from '../api/localAuthority/authoritiesByIdAPI';

export const DetailAuthorityPage = () => {
	const navigate = useNavigate();
	const { authorityId } = useParams<{ authorityId: string }>();
	const [searchParam] = useSearchParams();
	const page = Number(searchParam.get('page') || 1);

	const { authorityInfo } = useGetAuthorityByIdApi(authorityId ?? '');
	const { scheme } = useGetSchemeTypesById(authorityInfo?.SchemeType ?? -1);
	const handleNavigateBack = () => navigate(`/?page=${page}`);
	return (
		<>
			<PageHeader />
			<PageBody>
				<div className="min-w-72 flex flex-col flex-grow max-w-4xl w-full space-y-4">
					<div className="flex items-start flex-col space-y-4 text-white">
						<div className="text-base font-medium">{authorityInfo?.Name}</div>
						<div className="text-base font-medium">
							Rating Scheme: {scheme?.schemeTypeName} ({scheme?.schemeTypeKey})
						</div>
						<div className="text-base font-medium">
							Establishments: {authorityInfo?.EstablishmentCount}
						</div>
						<GetFoodRatingsForAuthority
							localAuthorityId={authorityInfo?.LocalAuthorityId}
							ratingSchemeId={scheme?.schemeTypeid}
						/>
						<button
							onClick={handleNavigateBack}
							className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-100 leading-6 text-black"
						>
							Back
						</button>
					</div>
				</div>
			</PageBody>
		</>
	);
};
