import { useState, useEffect } from "react";
import { PaginatedEstablishmentsTable } from "../components/PaginatedEstablishmentsTable";
import { getAuthorities, getCountries } from "../services/filterApi";

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

const HomePage = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [pageNum, setPageNum] = useState(1);
  const [authorities, setAuthorities] = useState<{ [key: string]: string }[]>(
    []
  );
  const [countries, setCountries] = useState<{ [key: string]: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState("");

  useEffect(() => {
    getAuthorities().then(
      (res) => {
        setAuthorities(res.authorities);
      },
      (error) => {
        setError(error);
      }
    );
    getCountries().then(
      (res) => {
        setCountries(res.countries);
      },
      (error) => {
        setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountry = (e: any) => {
    const index = parseInt(e.target.value) - 1;
    if (index !== undefined && countries[index].id !== undefined) {
      setSelectedCountry(countries[index].id.toString());
      setPageNum(1);
    }
  };

  const handleAuthorities = (e: any) => {
    const index = parseInt(e.target.value) - 1;
    if (
      index !== undefined &&
      authorities[index].LocalAuthorityId !== undefined
    ) {
      setSelectedAuthority(authorities[index].LocalAuthorityId.toString());
      setPageNum(1);
    }
  };
  return (
    <section>
      <h1 style={headerStyle}>{pageLabel}</h1>
      <div>
        <label style={headerStyle}>{labelAuth} </label>
        <select
          name="authorities"
          id="authorities"
          onChange={handleAuthorities}
        >
          {authorities.map((authority: any) => {
            return (
              <option value={authority.LocalAuthorityId}>
                {authority.Name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label style={headerStyle}>{labelCountry}</label>
        <select name="countries" id="countries" onChange={handleCountry}>
          {countries.map((country: any) => {
            return <option value={country.id}>{country.name}</option>;
          })}
        </select>
      </div>
      <PaginatedEstablishmentsTable
        pageNum={pageNum}
        setPageNum={setPageNum}
        error={error}
        setError={setError}
        selectedAuthority={selectedAuthority}
        selectedCountry={selectedCountry}
      />
    </section>
  );
};

export default HomePage;
