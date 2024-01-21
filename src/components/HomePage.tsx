import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import { AuthoritiesTable } from "./authorities/AuthoritiesTable";

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  return (
    <div>
      <header style={logoStyle} />
      <PaginatedEstablishmentsTable />
      <AuthoritiesTable />
    </div>
  );
};

export default HomePage;
