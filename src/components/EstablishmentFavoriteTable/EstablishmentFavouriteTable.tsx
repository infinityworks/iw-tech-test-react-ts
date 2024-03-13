import { useContext } from "react";
import { EstablishmentFavouriteContext } from "./EstablishmentFavouriteProvider";
import { EstablishmentLink } from "../EstablishmentLink/EstablishmentLink";

export const EstablishmentFavouriteTable = () => {
  const { items, loading, removeFavouriteItem } = useContext(
    EstablishmentFavouriteContext
  );
  return (
    <table className="establishment-table">
      <thead>
        <tr>
          <th>Business Name</th>
          <th>Rating Value</th>
          <th></th>
        </tr>
        {loading && (
          <tr>
            <th colSpan={3}>Loading ...</th>
          </tr>
        )}
      </thead>
      <tbody>
        {items.map((favourite) => (
          <tr key={favourite.FHRSID}>
            <td>
              <EstablishmentLink id={favourite.FHRSID}>
                {favourite.BusinessName}
              </EstablishmentLink>
            </td>
            <td>{favourite.RatingValue}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  removeFavouriteItem(favourite.FHRSID);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
