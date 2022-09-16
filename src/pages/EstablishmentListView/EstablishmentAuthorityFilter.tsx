import { useState, useEffect } from "react";
import { getAuthorities, Authority } from "../../api/ratingsAPI";

const filterStyle: { [key: string]: string | number } = {
  marginBottom: "1rem"
};

const EMPTY_FILTER_VALUE = '--all--';

type EstablishmentFilter = {
  onChange: (filter: string) => void
};

export const EstablishmentAuthorityFilter = (props: EstablishmentFilter ) => {
  const { onChange } = props;
  const [ authorities, setAuthorities ] = useState<Array<Authority>>([]);
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<{ message: string; [key: string]: string }>();

  useEffect(() => {
    getEstablishmentAuthorities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getEstablishmentAuthorities() {
    try {
      setLoading(true);
      const result = await getAuthorities();
      setAuthorities(result.authorities);
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (event: any) => {
    const filterValue = event.target.value;
    onChange(filterValue === EMPTY_FILTER_VALUE ? '' : filterValue);
  };

  if (isLoading || !authorities.length) {
    return null;
  }

  return (
    <div style={filterStyle}>
      <span>Authority: </span>
      <select onChange={handleChange}>
          <option
            key={EMPTY_FILTER_VALUE}
            value={EMPTY_FILTER_VALUE}
          >
            --- ALL AUTHORITIES ---
          </option>
        {
          authorities?.map((authority: Authority) => (
            <option
              key={authority.LocalAuthorityId}
              value={authority.LocalAuthorityId}
            >
              { authority.Name }
            </option>
          ))
        }
      </select>
    </div>
  );
};
