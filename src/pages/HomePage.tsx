import { useEffect, useState } from "react";
import { PaginatedEstablishmentsTable } from "../components/Tables/Establishments/PaginatedEstablishmentsTable";
import { getAuthorities, getCountries } from "../services/filterApi";
import Dropdown from "../components/Dropdown/dropdown";
import { Authority } from "../types/Authority";
import { Country } from "../types/Country";

const filterStyle: { [key: string]: string | number } = {
  padding: "10px",
  display: "grid",
  width: "35%",
  background: "rgba(51, 51, 51, 0.9)",
  marginLeft: "50px",
  color: "white",
  marginBottom: "3%",
};

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const labelAuth = "Choose an Authority:";
const labelCountry = "Choose a Country:";
const pageLabel = "Home Page";
const labelResetButton = "Reset Filter";

const HomePage = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [pageNum, setPageNum] = useState(1);
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState("");
  const [selectedCountryValue, setSelectedCountryValue] = useState("");
  const [selectedAuthorityValue, setSelectedAuthorityValue] = useState("");
  const [resetFilter, setResetFilter] = useState(false);

  useEffect(() => {
    getAuthoritiesFunction();
    getCountriesFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthoritiesFunction = async () => {
    getAuthorities().then(
      (res: any) => {
        const data: Authority = {
          EstablishmentCount: 0,
          LocalAuthorityId: 0,
          LocalAuthorityIdCode: "",
          Name: "",
          SchemeType: 0,
          links: [
            {
              rel: "",
              href: "",
            },
          ],
        };
        setAuthorities([data].concat(res.authorities));
      },
      (error) => {
        setError(error);
      }
    );
  };
  const getCountriesFunction = async () => {
    getCountries().then(
      (res: any) => {
        const data: Country = {
          code: "",
          id: 0,
          links: [{ rel: "", href: "" }],
          name: "",
          nameKey: "",
        };
        setCountries([data].concat(res.countries));
      },
      (error) => {
        setError(error);
      }
    );
  };

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    if (index !== undefined && countries[index].id !== undefined) {
      setSelectedCountry(countries[index].id.toString());
      setSelectedCountryValue(countries[index].id.toString());
      setPageNum(1);
    }
  };

  const handleAuthorities = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    if (
      index !== undefined &&
      authorities[index].LocalAuthorityId !== undefined
    ) {
      setSelectedAuthority(index.toString());
      setSelectedAuthorityValue(authorities[index].LocalAuthorityId.toString());
      setPageNum(1);
    }
  };

  const handleResetFilterToOne = () => {
    setSelectedCountry("");
    setSelectedAuthority("");
    setSelectedAuthorityValue("");
    setSelectedCountryValue("");
    setPageNum(1);
    setResetFilter(true);
  };
  const handleResetFilter = () => {
    setSelectedCountry("");
    setSelectedAuthority("");
    setSelectedAuthorityValue("");
    setSelectedCountryValue("");
    setResetFilter(true);
  };

  return (
    <section>
      <h1 style={headerStyle}>{pageLabel}</h1>
      <aside style={filterStyle}>
        <Dropdown
          name={"authorities"}
          label={labelAuth}
          onChange={handleAuthorities}
          value={selectedAuthority}
          options={authorities}
          optionLabel={"Name"}
        />
        <Dropdown
          name={"countries"}
          label={labelCountry}
          onChange={handleCountry}
          value={selectedCountry}
          options={countries}
          optionLabel={"name"}
        />
        <div>
          <button onClick={handleResetFilterToOne}>{labelResetButton}</button>
        </div>
      </aside>
      <PaginatedEstablishmentsTable
        pageNum={pageNum}
        setPageNum={setPageNum}
        error={error}
        setError={setError}
        selectedAuthority={selectedAuthorityValue}
        selectedCountry={selectedCountryValue}
        resetFilter={resetFilter}
        setResetFilter={setResetFilter}
        handleResetFilter={handleResetFilter}
      />
    </section>
  );
};

export default HomePage;
