import { useState, useEffect, useContext } from "react";
import { FavoriteTableRow } from "./FavoriteTableRow";

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const labelEmpty = "Nothing to display";

export const FavoriteTable: React.FC<{
  state: {
    data: { [key: string]: string }[];
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  };
  setState:any
}> = ({ state, setState }) => {
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
        {state.data && state.data.length > 0 && state.isLoading === false ? (
          state.data.map(
            (
              establishment: { [key: string]: string } | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <FavoriteTableRow
                key={index}
                establishment={establishment}
                headerAttr={state.headerAttr}
                setState={setState}
                state={state}
              />
            )
          )
        ) : state.data?.length === 0 ? (
          <tr>
            <td>{labelEmpty}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};
