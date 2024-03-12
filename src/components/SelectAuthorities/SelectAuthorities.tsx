import { useState } from "react";
import { useFetchAuthorities } from "../../hooks/useFetchAuthorities";

type SelectAuthoritiesProps = {
  onChange: (value: string) => void;
};

export const SelectAuthorities = ({ onChange }: SelectAuthoritiesProps) => {
  const { data, error, loading } = useFetchAuthorities();
  const [value, setValue] = useState<string | undefined>(undefined);
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
        <option selected disabled value={undefined}>
          Loading...
        </option>
      )}
      {error && (
        <option selected disabled value={undefined}>
          There was error ...
        </option>
      )}
      {data && (
        <>
          <option selected value={undefined}>
            Select authority...
          </option>
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
