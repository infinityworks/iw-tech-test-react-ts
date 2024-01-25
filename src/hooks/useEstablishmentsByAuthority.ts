import { EstablishmentType } from 'api/establishments/establishmentsAPI';
import { useGetEstablishmentsByLocalAuthority } from 'api/establishments/establishmentsByLocalAuthority';
import { useEffect, useState } from 'react';

export const useGetEstablishmentsByAuthority = (localAuthorityId: number) => {
	const [data, setData] = useState<EstablishmentType[]>([]);

	const { establishments } =
		useGetEstablishmentsByLocalAuthority(localAuthorityId);

	useEffect(() => {
		if (establishments && establishments.length > 0) {
			setData(establishments);
		}
	}, [establishments]);

	return { establishments: data };
};
