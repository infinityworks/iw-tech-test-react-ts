import { createAPIMethod } from '../../utils';
import { EstablishmentType } from './establishmentsAPI';

export const getEstablishmentById = (
	establishmentId: string,
): Promise<EstablishmentType> => {
	const query = createAPIMethod<EstablishmentType>({
		url: `Establishments/${establishmentId}`,
	});

	return query();
};
