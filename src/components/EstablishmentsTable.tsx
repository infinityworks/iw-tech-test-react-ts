import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: { [key: string]: string }[] | null | undefined;
}> = ({ establishments }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
      </thead>
      
      <tbody>
        {establishments &&
          establishments?.map(
            (
              establishment: { [key: string]: string } | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
              />
            )
          )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
