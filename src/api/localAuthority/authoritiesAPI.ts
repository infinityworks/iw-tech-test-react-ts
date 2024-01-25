import { useEffect, useState } from 'react';
import { AdditionalProps } from '../../utils/additionalProps';
import { createAPIMethod } from '../../utils/createAPIMethod';

export interface AuthorityAPIType extends AdditionalProps {
	LocalAuthorityId: number;
	EstablishmentCount: number;
	SchemeType: number;
	LocalAuthorityIdCode: string;
	Name: string;
}

export interface AuthoritiesAPIType extends AdditionalProps {
	authorities: AuthorityAPIType[];
}

export const useGetAuthoritiesApi = (pageNumber: number) => {
	const [data, setData] = useState<AuthoritiesAPIType>();

	useEffect(() => {
		const query = createAPIMethod<AuthoritiesAPIType>({
			url: `Authorities/basic/${pageNumber}/10`,
		});
		let active = true;
		loadData();

		return () => {
			active = false;
		};

		async function loadData() {
			const res = await query();
			if (!active) {
				return;
			}
			setData(res);
		}
	}, [pageNumber]);

	return {
		...data,
	};
};
