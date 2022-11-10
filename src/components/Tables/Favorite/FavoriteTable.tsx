import { FavoriteTableRow } from "./FavoriteTableRow";
import { Establishment } from "../../../types/Establishment";

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const labelEmpty = "Nothing to display";

interface Props {
  data: Establishment[];
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
}
export const FavoriteTable = ({ data, headerAttr, handleDelete }: Props) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(headerAttr).map((attr: string, index: number) => {
            return (
              <th key={index} style={headerStyle}>
                {attr}
              </th>
            );
          })}
        </tr>
        {data && data.length > 0 ? (
          data.map((establishment: Establishment, index: number) => (
            <FavoriteTableRow
              key={index}
              establishment={establishment}
              headerAttr={headerAttr}
              handleDelete={handleDelete}
            />
          ))
        ) : data?.length === 0 ? (
          <tr>
            <td>{labelEmpty}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};
