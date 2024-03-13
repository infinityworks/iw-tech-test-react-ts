import { useContext } from "react";
import { EstablishmentFavouriteContext } from "../EstablishmentFavoriteTable";
import { EstablishmentLink } from "../EstablishmentLink/EstablishmentLink";

type EstablishmentsTableRowProps = {
  establishment: Pick<
    EstablishmentDto,
    "BusinessName" | "RatingValue" | "FHRSID"
  >;
};

export const EstablishmentsTableRow = ({
  establishment,
}: EstablishmentsTableRowProps) => {
  const { getIsInFavourite, addFavouriteItem, removeFavouriteItem } =
    useContext(EstablishmentFavouriteContext);
  const isChecked = getIsInFavourite(establishment.FHRSID);
  return (
    <tr>
      <td>
        <EstablishmentLink id={establishment.FHRSID}>
          {establishment.BusinessName}
        </EstablishmentLink>
      </td>
      <td>{establishment.RatingValue}</td>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => {
            if (event.target.checked) {
              addFavouriteItem(establishment);
            } else {
              removeFavouriteItem(establishment.FHRSID);
            }
          }}
        />
      </td>
    </tr>
  );
};
