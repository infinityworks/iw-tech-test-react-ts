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
  state: {
    data: {}[];
    headerAttr: { BusinessName: string; RatingValue: string };
    isLoading: boolean;
  };
}> = ({ establishments, state }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(state.headerAttr).map((attr: string, index: number) => {
            return (
              <th key={index} style={headerStyle}>
                {attr}
              </th>
            );
          })}
        </tr>
        {state.isLoading ? (
          <tr>
            <td>Loading ...</td>
          </tr>
        ) : null}
        {establishments ? (
          establishments && establishments.length > 0 ? (
            establishments.map(
              (
                establishment: { [key: string]: string } | null | undefined,
                index: React.Key | null | undefined
              ) => (
                <EstablishmentsTableRow
                  key={index}
                  establishment={establishment}
                  headerAttr={state.headerAttr}
                />
              )
            )
          ) : (
            <tr>
              <td>Nothing to display</td>
            </tr>
          )
        ) : null}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
  // state: {
  //   // data: PropTypes.array,
  //   headerAttr: { BusinessName: PropTypes.string, RatingValue: PropTypes.string },
  //   isLoading: PropTypes.bool
  // },
};
