import { Component } from "react";
import Pages from "./pages/pagesExport";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Pages />
      </Router>
    );
  }
}

export default App;
