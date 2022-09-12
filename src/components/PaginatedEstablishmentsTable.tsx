import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  getEstablishmentRatings,
  getFilteredEstablishmentRatings,
  Establishment
} from "../api/ratingsAPI";
import { EstablishmentAuthorityFilter } from "./EstablishmentAuthorityFilter";

const tableStyle: { [key: string]: string | number } = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  minHeight: "440px",
  minWidth: "550px",
  display: "flex",
  flexDirection: "column"
};

const loaderStyle: { [key: string]: string | number } = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export const PaginatedEstablishmentsTable = () => {
  const [establishments, setEstablishments] = useState<Array<Establishment>>([]);
  const [error, setError] = useState<{ message: string; [key: string]: string }>();
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pageCount] = useState(100);
  const [authorityId, setAuthorityId] = useState<string>('');

  useEffect(() => {
    async function fetchEstablishmentRatingsPage(page: number, authorityId: string): Promise<void> {
      try {
        setLoading(true);
        setEstablishments([]);

        let result;
        if (authorityId) {
          result = await getFilteredEstablishmentRatings(pageNum, authorityId);
        } else {
          result = await getEstablishmentRatings(pageNum);
        }

        setEstablishments(result.establishments);
        setError(undefined);
      } catch(error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEstablishmentRatingsPage(pageNum, authorityId);
  }, [pageNum, authorityId]);

  function handleFilterChange(filter: string) {
    if (filter !== authorityId) {
      setAuthorityId(filter);
      setPageNum(1);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>

        <EstablishmentAuthorityFilter
          onChange={handleFilterChange}
        />

        <EstablishmentsTable
          establishments={establishments}
        />

        {
          isLoading && (
            <span style={loaderStyle}>Loading...</span>
          )
        }

        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          updatePage={setPageNum}
        />
      </div>
    );
  }
};
