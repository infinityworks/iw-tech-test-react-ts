import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageBody } from 'ui/pageBody';
import { PageNavigation } from 'ui/PageNavigation';
import { useSearchURLParams } from 'utils/useSearchURLParams';
import {
	AuthorityAPIType,
	useGetAuthoritiesApi,
} from '../api/localAuthority/authoritiesAPI';

interface AuthorityRowDataProps {
	authority: AuthorityAPIType;
	pageNumber: number;
}

const AuthorityRowData = ({ authority, pageNumber }: AuthorityRowDataProps) => {
	return (
		<Link
			to={`/authority/${authority.LocalAuthorityId}?page=${pageNumber}`}
			className="flex w-full items-center rounded-md bg-white mb-2 p-4 gap-x-4"
		>
			<div className="flex w-full justify-between items-center">
				<div className="text-sm font-medium">{authority.Name}</div>
				<div className="text-sm font-medium">
					{authority.EstablishmentCount}
				</div>
			</div>
		</Link>
	);
};
export const PaginatedAuthoritiesTable = () => {
	const [page, setURLPageParam] = useSearchURLParams('page', 1);

	const [pageData, setPageData] = useState<AuthorityAPIType[]>([]);
	const { authorities } = useGetAuthoritiesApi(page);

	const handlePreviousPage = () => {
		page > 1 && setURLPageParam(page - 1);
	};
	const handleNextPage = () => {
		setURLPageParam(page + 1);
	};

	useEffect(() => {
		if (authorities && authorities.length > 0) {
			setPageData(authorities);
		}
	}, [authorities]);
	return (
		<>
			<PageNavigation />
			<PageBody>
				<div className="min-w-72 flex flex-col flex-grow max-w-4xl w-full space-y-4">
					<div className="flex flex-col space-y-4 w-full">
						<div className="flex w-full justify-between items-center text-white underline font-bold">
							<div className="text-sm font-medium">Name</div>
							<div className="text-sm font-medium">Establishments</div>
						</div>
						<ul className="flex w-full flex-col">
							{pageData.length > 0 &&
								pageData.map((item, index) => (
									<li key={index}>
										<AuthorityRowData
											key={item.LocalAuthorityId}
											authority={item}
											pageNumber={page}
										/>
									</li>
								))}
						</ul>
						<div className="flex w-full justify-between bg-black text-white rounded-md p-4 text-lg font-bold">
							<button
								disabled={page <= 1}
								className="hover:underline disabled:no-underline"
								onClick={handlePreviousPage}
							>
								Prev
							</button>
							<span className="underline">{page}</span>
							<button className="hover:underline" onClick={handleNextPage}>
								Next
							</button>
						</div>
					</div>
				</div>
			</PageBody>
		</>
	);
};
