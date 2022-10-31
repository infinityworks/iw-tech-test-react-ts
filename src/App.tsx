import { Component } from "react";
import Pages from "./pages/pagesExport";
import { BrowserRouter as Router } from "react-router-dom";
import Background from "./static/logo.svg";

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

class App extends Component {
  render() {
    return (
      <>
        <header style={logoStyle} />
        <Router>
          <Pages />
        </Router>
      </>
    );
  }
}

export default App;
