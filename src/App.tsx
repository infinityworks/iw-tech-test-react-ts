import { Component } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { EstablishmentDetailPage } from './components/EstablishmentDetailPage';
class App extends Component {
  render() {
    return(
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<EstablishmentDetailPage />} />
      </Routes>
     </BrowserRouter>
 )}
}

export default App;
