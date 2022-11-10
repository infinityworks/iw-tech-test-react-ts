import React, { useContext, useState } from "react";
import { FavoriteContext, FavoriteDeletionContext } from "../App";
import { FavoriteTable } from "../components/Tables/Favorite/FavoriteTable";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  marginTop: "3%",
  color: "white",
};
const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const pageLabel = "Favorite Table";

type EstablishmentsType = {
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  RatingValue: string;
  RatingDate: string;
  links: [
    {
      rel: string;
      href: string;
    }
  ];
}

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
  const [state] = useState<{
    data: { [key: string]: string }[];
    headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
    isLoading: boolean;
  }>(initialState);

  const handleDelete = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id !== null) {
        const filtered = favorite.filter((obj: EstablishmentsType) => {
          if (obj.FHRSID === parseInt(id)) setFavoriteDeletion(obj.FHRSID);
          return obj.FHRSID !== parseInt(id);
        });
        if (filtered.length === 0) setFavorite([]);
        setFavorite(filtered);
      }
    }
  };

  return (
    <div style={tableStyle}>
      <h3 style={headerStyle}> {pageLabel}</h3>
      <aside style={headerStyle}>
        <FavoriteTable
          headerAttr={state.headerAttr}
          data={favorite}
          handleDelete={handleDelete}
        />
      </aside>
    </div>
  );
};
export default Favorite;
