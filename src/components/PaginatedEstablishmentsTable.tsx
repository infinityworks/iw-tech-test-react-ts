import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  getEstablishmentRatings,
  getFilteredEstablishmentRatings,
} from "../services/ratingsAPI";
import { getAuthorities, getCountries } from "../services/filterApi";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
};

const labelAuth= "Choose an Authority:"
const labelCountry = "Choose a Country:"
const labelFood = "Food Hygiene Ratings"

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  let initialState = {
    data: [],
    headerAttr: {
      BusinessName: "BusinessName",
      RatingValue: "RatingValue",
    },
    isLoading: false,
  };
  const [state, setState] = useState<{
    data: {}[];
    headerAttr: { BusinessName: string; RatingValue: string };
    isLoading: boolean;
  }>(initialState);

  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [authorities, setAuthorities] = useState<{ [key: string]: string }[]>(
    []
  );
  const [countries, setCountries] = useState<{ [key: string]: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAuthoritiy, setSelectedAuthority] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);

  useEffect(() => {
    setState({ ...state, isLoading: true });

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
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({ ...state, isLoading: true });
    getFilteredEstablishmentRatings(
      pageNum,
      selectedAuthoritiy,
      selectedCountry
    ).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedAuthoritiy]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setState({ ...state, isLoading: true });
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setState({ ...state, isLoading: true });
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
  }

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
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
        <div style={tableStyle}>
          <h2>{labelFood}</h2>
          <EstablishmentsTable establishments={establishments} state={state} />
          <EstablishmentsTableNavigation
            pageNum={pageNum}
            pageCount={pageCount}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </div>
      </>
    );
  }
};
