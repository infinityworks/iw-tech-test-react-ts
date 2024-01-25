import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailAuthorityPage } from './DetailAuthorityPage';
import { PaginatedAuthoritiesTable } from './PaginatedAuthoritiesTable';
import { PaginatedEstablishmentsTable } from './PaginatedEstablishmentsTable';

const HomePage = () => {
	return (
		<main className="min-h-screen flex flex-col gap-4">
			<Routes>
				<Route
					key="home"
					index
					path="/"
					element={<PaginatedAuthoritiesTable />}
				/>
				<Route
					key="establishments"
					path="/establishments"
					element={<PaginatedEstablishmentsTable />}
				/>
				<Route
					key="establishments"
					path="/authority/:authorityId"
					element={<DetailAuthorityPage />}
				/>
				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
		</main>
	);
};

export default HomePage;
