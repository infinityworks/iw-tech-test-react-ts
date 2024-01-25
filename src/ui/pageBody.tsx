import { PropsWithChildren } from 'react';

export const PageBody = ({ children }: PropsWithChildren<{}>) => {
	return (
		<section className="w-full mx-auto items-center flex flex-col">
			{children}
		</section>
	);
};
