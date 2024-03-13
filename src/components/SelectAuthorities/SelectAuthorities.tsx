import { useEffect, useState } from "react";
import { useFetchAuthorities } from "../../hooks/useFetchAuthorities";

type SelectAuthoritiesProps = {
  onChange: (value: string) => void;
};

export const SelectAuthorities = ({ onChange }: SelectAuthoritiesProps) => {
  const { data, error, loading } = useFetchAuthorities();
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    loading ? setValue("loading") : setValue(undefined);
  }, [loading]);

  useEffect(() => {
    error ? setValue("error") : setValue(undefined);
  }, [error]);

  return (
    <select
      name="authorities"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event.target.value);
      }}
    >
      {loading && (
        <option disabled value={"loading"}>
          Loading...
        </option>
      )}
      {error && (
        <option disabled value={"error"}>
          There was error ...
        </option>
      )}
      {data && (
        <>
          <option value={undefined}>Select authority...</option>
          {data?.authorities.map(({ LocalAuthorityId, Name }) => {
            return (
              <option key={LocalAuthorityId} value={LocalAuthorityId}>
                {Name}
              </option>
            );
          })}
        </>
      )}
    </select>
  );
};
