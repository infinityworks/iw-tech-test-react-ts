import { useContext, useState } from "react";
import { FavoriteContext } from "../App";

const Favorite = () => {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const [checked, setChecked] = useState(true);

  const handleDelete = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (!checked === false) {
        const filtered = favorite.filter(
          (obj: any) => obj.FHRSID !== parseInt(id)
        );
        if (filtered.length === 0) setFavorite([]);
        setFavorite(filtered);
      }
    }
  };

  return (
    <>
      {favorite?.map((fav: any, index: number) => {
        return (
          <div key={index}>
            {fav.BusinessName} | {fav.RatingValue} |
            <input
              id={fav.FHRSID}
              type="checkbox"
              onChange={handleDelete}
              defaultChecked={checked}
            />
          </div>
        );
      })}
    </>
  );
};
export default Favorite;
