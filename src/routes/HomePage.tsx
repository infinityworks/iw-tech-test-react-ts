import { PaginatedEstablishmentsTable } from "../components/EstablishmentTablePaginated";
import { PageTemplate } from "../components/PageTemplate";

const HomePage = () => {
  return (
    <PageTemplate>
      <PaginatedEstablishmentsTable />
    </PageTemplate>
  );
};

export default HomePage;
