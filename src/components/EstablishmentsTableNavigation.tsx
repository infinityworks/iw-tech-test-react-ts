const buttonStyle = {
  margin: "0 5px",
};

type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  updatePage: (pageNum: number) => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, updatePage } = props;

  return (
    <nav>
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum <= 1}
          onClick={() => updatePage(pageNum - 1)}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum >= pageCount}
          onClick={() => updatePage(pageNum + 1)}
        >
          +
        </button>
      }
    </nav>
  );
};
