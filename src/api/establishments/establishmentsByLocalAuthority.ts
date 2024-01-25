import { EstablishmentsType } from 'api/establishments/establishmentsAPI';
import { useEffect, useState } from 'react';
import { createAPIMethod } from 'utils';

export const useGetEstablishmentsByLocalAuthority = (authorityId: number) => {
	const [data, setData] = useState<EstablishmentsType>();

	useEffect(() => {
		const query = createAPIMethod<EstablishmentsType>({
			url: `Establishments?localAuthorityId=${authorityId}`,
		});

		let active = true;
		load().finally();
		return () => {
			active = false;
		};

		async function load() {
			const res = await query();
			if (!active) {
				return;
			}
			setData(res);
		}
	}, [authorityId]);
	return { ...data };
};