import { useEffect, useState } from 'react';
import { AdditionalProps, createAPIMethod } from 'utils';

export interface SchemeTypeApiType extends AdditionalProps {
	schemeTypeid: number;
	schemeTypeName: string;
	schemeTypeKey: string;
}

export interface SchemesTypesApiType extends AdditionalProps {
	schemeTypes: SchemeTypeApiType[];
}

export const useGetSchemeTypes = () => {
	const [data, setData] = useState<SchemesTypesApiType>();

	useEffect(() => {
		const query = createAPIMethod<SchemesTypesApiType>({ url: `SchemeTypes` });
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
	}, []);
	return { ...data };
};
