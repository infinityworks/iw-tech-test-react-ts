import { PropsWithChildren } from 'react';
import Background from '../static/logo.svg';

const logoStyle: { [key: string]: string | number } = {
	width: '640px',
	height: '25px',
	background: `transparent url(${Background}) no-repeat center`,
	margin: '20px auto',
};
export const PageHeader = ({ children }: PropsWithChildren<{}>) => {
	return (
		<header className="flex flex-col space-y-4">
			<div className="" style={logoStyle} />
			{children}
		</header>
	);
};