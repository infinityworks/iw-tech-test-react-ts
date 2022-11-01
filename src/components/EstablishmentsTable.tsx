import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  state: {
    data: { [key: string]: string }[] | null | undefined;
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  };
}> = ({ state }) => {
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
        {state.data && state.data.length > 0 && state.isLoading === false ? (
          state.data.map(
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
        ) : state.data?.length === 0 ? (
          <tr>
            <td>Nothing to display</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  // state: {
  //   // data: PropTypes.arrayOf(PropTypes.object),
  //   headerAttr: { BusinessName: PropTypes.string, RatingValue: PropTypes.string },
  //   isLoading: PropTypes.bool,
  // }
};
