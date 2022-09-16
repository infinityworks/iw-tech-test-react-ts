const loaderStyle: { [key: string]: string | number } = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const Loader = () => {
  return (
    <span style={loaderStyle}>Loader...</span>
  );
};

export default Loader;
