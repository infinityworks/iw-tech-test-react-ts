type CreateAPIMethod = <TOutput>(opts: {
	url: string;
}) => () => Promise<TOutput>;

export const createAPIMethod: CreateAPIMethod = (opts) => async () => {
	const res = await fetch(`http://api.ratings.food.gov.uk/${opts.url}`, {
		headers: { 'x-api-version': '2' },
	});

	return res.json();
};
