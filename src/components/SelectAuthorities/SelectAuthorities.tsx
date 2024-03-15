import { useEffect, useState } from "react";
import { getAuthorities } from "../../api/getAuthorities";
import { useQuery } from "@tanstack/react-query";

type SelectAuthoritiesProps = {
  onChange: (value: string) => void;
};

export const SelectAuthorities = ({ onChange }: SelectAuthoritiesProps) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["getAuthorities"],
    queryFn: getAuthorities,
  });
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
