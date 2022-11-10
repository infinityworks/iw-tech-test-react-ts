import React, { useContext, useEffect } from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import { FavoriteContext, FavoriteDeletionContext } from "../../../App";
import PropTypes from "prop-types";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

const labelLoading = "Loading ...";
const labelEmpty = "Nothing to display";

export const EstablishmentsTable: React.FC<{
  state: {
    data: { [key: string]: string }[];
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  };
  setState: any;
}> = ({ state, setState }) => {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { favoriteDeletion, setFavoriteDeletion } = useContext(
    FavoriteDeletionContext
  );

  const handleChange = (isFavorite: boolean, i: number) => {
    const id = parseInt(state.data[i].FHRSID);

    if (Boolean(state.data[i].isFavorite) === false) {
      // putting defaulteEstablishment into favorite context
      const index = favorite.findIndex((fav: any) => {
        return fav.FHRSID === id;
      });
      // mapping to big payload
      const data = state.data.map((fav: any) => {
        if (fav.FHRSID === id) {
          fav.isFavorite = true;
        }
        return fav;
      });
      setState({ ...state, data: data });

      if (index === -1) setFavorite([...favorite, state.data[i]]);
    } else if (Boolean(state.data[i].isFavorite) === true) {
      // mapping to big payload
      const data = state.data.map((fav: any) => {
        if (fav.FHRSID === id) {
          fav.isFavorite = false;
        }
        return fav;
      });
      setState({ ...state, data: data });
      // putting defaulteEstablishment into favorite context
      const filtered = favorite.filter((obj: any) => obj.FHRSID !== id);
      if (filtered.length === 0) setFavorite([]);
      setFavorite(filtered);
    }
  };

  useEffect(() => {
    const index = state.data.findIndex((val) => {
      return val.FHRSID === favoriteDeletion;
    });
    if (
      index !== -1 &&
      favoriteDeletion !== 0 &&
      state.data[index].FHRSID === favoriteDeletion
    ) {
      setState({
        ...state,
        data: state.data.map((val: any) => {
          if (val.FHRSID === favoriteDeletion) {
            val.isFavorite = !val.isFavorite;
            return val;
          } else return val;
        }),
      });
      setFavoriteDeletion(0);
    }
  }, [favoriteDeletion, setFavoriteDeletion, setState, state]);

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
            <td>{labelLoading}</td>
          </tr>
        ) : null}
        {state.data && state.data.length > 0 && state.isLoading === false ? (
          state.data.map(
            (
              establishment: { [key: string]: string } | null | undefined,
              indexRow: number
            ) => (
              <EstablishmentsTableRow
                indexRow={indexRow}
                establishment={establishment}
                headerAttr={state.headerAttr}
                setState={setState}
                state={state}
                handleChange={handleChange}
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

//[key: PropTypes.string.isRequired]: PropTypes.string.isRequired
// EstablishmentsTable.propTypes = {
//   state: {
//     data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//     headerAttr: {
//       BusinessName: PropTypes.string.isRequired,
//       RatingValue: PropTypes.string.isRequired,
//       Favorite: PropTypes.string.isRequired,
//     },
//     isLoading: PropTypes.bool.isRequired,
//   },
//   setState: PropTypes.func.isRequired,
// };
