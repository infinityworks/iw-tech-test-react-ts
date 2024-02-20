import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    margin: "0 5px",
    userSelect: "none"
  }
});

type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, onPreviousPage, onNextPage } = props;
  const classes = useStyles();
  return (
    <nav>
      {
        <button
          type="button"
          className={classes.button}
          disabled={pageNum <= 1}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          className={classes.button}
          disabled={pageNum >= pageCount}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};
