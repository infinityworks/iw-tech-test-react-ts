import { useContext,useEffect,useState } from "react";
import { FavoriteContext, FavoriteDeletionContext } from "../App";
import { FavoriteTable } from "../components/Tables/Favorite/FavoriteTable";

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const pageLabel = "Favorite Table";
const buttonLabel = "Remove";

const Favorite = () => {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { setFavoriteDeletion } = useContext(FavoriteDeletionContext);
  let initialState = {
    data: favorite,
    headerAttr: {
      BusinessName: "BusinessName",
      RatingValue: "RatingValue",
      Favorite: "Favorite",
    },
    isLoading: false,
  };
  const [state, setState] = useState<{
    data: { [key: string]: string }[];
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  }>(initialState);

 useEffect(()=>{
  console.log(favorite)
 },[favorite])

  return (
    <div style={headerStyle}>
      <h3> {pageLabel}</h3>
      {/* <aside>
        {favorite?.map((fav: any, index: number) => {
          return (
            <div key={index}>
              {fav.BusinessName} | {fav.RatingValue} |
              <button id={fav.FHRSID} onClick={handleDelete}>
                {buttonLabel}
              </button>
            </div>
          );
        })}
      </aside> */}
      <FavoriteTable state={state} setState={setState} />
    </div>
  );
};
export default Favorite;
