import { useState } from "react";
import { SelectAuthorities } from "../SelectAuthorities";
import { TableWithFilters } from "./TableWithFilters";
import { TableBasic } from "./TableBasic";

export const PaginatedEstablishmentsTable = () => {
  const [localAuthorityId, setLocalAuthorityId] = useState<
    string | undefined
  >();

  return (
    <>
      <h2>Food Hygiene Ratings</h2>
      <div>
        <SelectAuthorities
          onChange={(val) => {
            setLocalAuthorityId(val);
          }}
        />
        {localAuthorityId ? (
          <TableWithFilters localAuthorityId={localAuthorityId} />
        ) : (
          <TableBasic />
        )}
      </div>
    </>
  );
};
