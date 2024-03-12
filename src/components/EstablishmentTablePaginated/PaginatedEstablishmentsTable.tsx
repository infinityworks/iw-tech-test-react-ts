import { useState } from "react";
import { SelectAuthorities } from "../SelectAuthorities";
import { TableWithFilters } from "./TableWithFilters";
import { TableBasic } from "./TableBasic";
import "./index.css";

export const PaginatedEstablishmentsTable = () => {
  const [localAuthorityId, setLocalAuthorityId] = useState<
    string | undefined
  >();

  return (
    <div className="establishment-container">
      <h2>Food Hygiene Ratings</h2>
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
  );
};
