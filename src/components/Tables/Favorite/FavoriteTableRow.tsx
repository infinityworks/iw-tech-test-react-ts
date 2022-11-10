import { Establishment } from "../../../types/Establishment";
import {ATRIBUTE_TYPES} from "../../../types/enum";

const styledValues: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

interface Props {
  establishment: Establishment;
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
}

const buttonLabel = "Remove";

export const FavoriteTableRow = ({
  establishment,
  handleDelete,
  headerAttr,
}: Props) => {
  return (
    <tr>
      {establishment !== undefined && establishment !== null
        ? Object.keys(headerAttr).map((attr: string, index: number) => {
            switch (attr) {
              case ATRIBUTE_TYPES.BUSINESS_NAME:
                return (
                  <td
                    id={establishment.FHRSID.toString()}
                    key={index}
                    style={styledValues}
                  >
                    {establishment[attr]}
                  </td>
                );
              case ATRIBUTE_TYPES.RATING_VALUE:
                return (
                  <td key={index} style={styledValues}>
                    {establishment[attr]}
                  </td>
                );
              case ATRIBUTE_TYPES.FAVORITE:
                return (
                  <td key={index}>
                    <button
                      id={establishment.FHRSID.toString()}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => handleDelete(event)}
                    >
                      {buttonLabel}
                    </button>
                  </td>
                );
              default:
                return null;
            }
          })
        : null}
    </tr>
  );
};
