import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import { createUseStyles } from "react-jss";
import { NullableEstablishments } from "../types";

const useStyles = createUseStyles({
  header: {
    paddingBottom: "10px",
    textAlign: "left",
    fontSize: "20px",
  }
});

interface Props {
  establishments: NullableEstablishments;
  isLoading: boolean
}

export const EstablishmentsTable= (props: Props) => {
  const { establishments, isLoading } = props;
  const classes = useStyles();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th className={classes.header}>Business Name</th>
          <th className={classes.header}>Rating Value</th>
        </tr>
        {establishments &&
          establishments.map(
            (establishment, index) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
              />
            )
          )}
      </tbody>
    </table>
  );
};
