import { useSearchParams } from 'react-router-dom';
import { isEmpty } from './isEmpty';

export const useSearchURLParams = (
	searchParamName: string,
	defaultValue: number,
): readonly [
	searchParamsState: number,
	setSearchParamsState: (newState: number) => void,
] => {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchParamsState = Number(
		searchParams.get(searchParamName) ?? defaultValue,
	);

	const setSearchParamsState = (newState: number) => {
		const newValue = newState.toString();
		let next = Object.assign(
			{},
			[...searchParams.entries()].reduce(
				(o, [key, value]) => ({ ...o, [key]: value }),
				{},
			),
			{ [searchParamName]: newValue },
		);
		if (isEmpty(newValue)) {
			next = {};
		}
		setSearchParams(next);
	};
	return [searchParamsState, setSearchParamsState];
};
