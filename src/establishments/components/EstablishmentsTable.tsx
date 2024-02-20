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
}

export const EstablishmentsTable= ({ establishments }: Props) => {
  const classes = useStyles();

  console.log('### Esta: ', establishments);

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
