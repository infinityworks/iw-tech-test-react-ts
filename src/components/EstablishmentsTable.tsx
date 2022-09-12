import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { Establishment } from "../api/ratingsAPI";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: Array<Establishment> | null | undefined;
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
        {establishments?.map((establishment: Establishment) => (
            <EstablishmentsTableRow
              key={establishment.FHRSID}
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
