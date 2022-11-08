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
  data: { [key: string]: string }[];
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  handleDelete:any;
}> = ({ data, headerAttr,handleDelete }) => {
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
          data.map(
            (
              establishment: { [key: string]: string } | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <FavoriteTableRow
                key={index}
                establishment={establishment}
                headerAttr={headerAttr}
                handleDelete={handleDelete}
              />
            )
          )
        ) : data?.length === 0 ? (
          <tr>
            <td>{labelEmpty}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};
