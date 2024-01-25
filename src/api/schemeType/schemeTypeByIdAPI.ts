import { useGetSchemeTypes } from 'api/schemeType/schemeTypesAPI';
import { useMemo } from 'react';

export const useGetSchemeTypesById = (schemeId: number) => {
	const query = useGetSchemeTypes().schemeTypes;

	return useMemo(() => {
		const scheme = query?.find((item) => item.schemeTypeid === schemeId);

		return { scheme: scheme };
	}, [query, schemeId]);
};