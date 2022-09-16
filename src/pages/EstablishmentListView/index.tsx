import { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import { EstablishmentsNavigation } from "./EstablishmentsNavigation";
import {
  getEstablishmentRatings,
  getFilteredEstablishmentRatings,
  Establishment
} from "../../api/ratingsAPI";
import { EstablishmentAuthorityFilter } from "./EstablishmentAuthorityFilter";
import Loader from "../../components/Loader";
import { EstablishmentListRow } from "./EstablishmentListRow"

type EstablishmentListProps = {
  onEstablishmentClick: (pageNum: number) => void;
};

export const EstablishmentListView = ({ onEstablishmentClick }: EstablishmentListProps) => {
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
          result = await getFilteredEstablishmentRatings(page, authorityId);
        } else {
          result = await getEstablishmentRatings(page);
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
      <>
        <h2>Food Hygiene Ratings</h2>

        <EstablishmentAuthorityFilter
          onChange={handleFilterChange}
        />

        <Table
          columns={['Business Name', 'Rating Value']}
        >
          {
            establishments?.map((establishment: Establishment) => (
              <EstablishmentListRow
                key={establishment.FHRSID}
                establishment={establishment}
                onclick={onEstablishmentClick}
              />
            ))
          }
        </Table>

        { isLoading && <Loader /> }

        <EstablishmentsNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          updatePage={setPageNum}
        />
      </>
    );
  }
};
