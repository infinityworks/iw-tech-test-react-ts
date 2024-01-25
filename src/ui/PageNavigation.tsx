import { NavLink } from 'react-router-dom';
import { PageHeader } from 'ui/PageHeader';

const NavigationItems = [
	{ name: 'Local Authorities', url: '/' },
	{ name: 'Establishments', url: '/establishments' },
];
export const PageNavigation = () => {
	return (
		<PageHeader>
			<section className="flex w-full items-center">
				<nav className="mx-auto p-4 flex space-x-4">
					{NavigationItems.map((item, index) => (
						<NavLink
							className={({ isActive }) =>
								isActive ? 'text-white underline font-bold' : 'text-black'
							}
							to={item.url}
							key={index}
						>
							{item.name}
						</NavLink>
					))}
				</nav>
			</section>
		</PageHeader>
	);
};
