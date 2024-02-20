import { createUseStyles } from "react-jss";
import { PaginatedEstablishmentsTable } from "../../establishments/components/PaginatedEstablishmentsTable";
import Background from "../../static/logo.svg";

const useStyles = createUseStyles({
  header: {
    width: "640px",
    height: "25px",
    background: `transparent url(${Background}) no-repeat center`,
    margin: "20px auto",
  }
});

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.header} />
      <PaginatedEstablishmentsTable />
    </div>
  );
};

export default HomePage;
