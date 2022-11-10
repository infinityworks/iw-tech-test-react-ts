import { useState, createContext } from "react";
import Pages from "./pages/pagesExport";
import Favorite from "./pages/Favorite";
import { BrowserRouter as Router } from "react-router-dom";
import Background from "./static/logo.svg";
export const FavoriteContext = createContext<any>(!undefined);
export const FavoriteDeletionContext = createContext<any>(!undefined);

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

function App() {
  const [favorite, setFavorite] = useState([] as any);
  const [favoriteDeletion, setFavoriteDeletion] = useState(0);

  return (
    <>
      <header style={logoStyle} />
      <Router>
        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
          <FavoriteDeletionContext.Provider
            value={{ favoriteDeletion, setFavoriteDeletion }}
          >
            <Pages />
            <Favorite />
          </FavoriteDeletionContext.Provider>
        </FavoriteContext.Provider>
      </Router>
    </>
  );
}

export default App;
