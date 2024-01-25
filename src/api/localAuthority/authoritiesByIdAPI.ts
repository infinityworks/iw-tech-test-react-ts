import { useEffect, useState } from 'react';
import { createAPIMethod } from '../../utils/createAPIMethod';
import { AuthorityAPIType } from './authoritiesAPI';

export const useGetAuthorityByIdApi = (authorityId: string) => {
	const [data, setData] = useState<AuthorityAPIType>();

	useEffect(() => {
		const query = createAPIMethod<AuthorityAPIType>({
			url: `Authorities/${authorityId}`,
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
	}, [authorityId]);

	return { authorityInfo: data };
};
