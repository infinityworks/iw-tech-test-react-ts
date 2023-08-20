import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EstablishmentPage from "./pages/EstablishmentPage";

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/establishment/:id' element={<EstablishmentPage />} />
    </Routes>
  );
};

export default Root;