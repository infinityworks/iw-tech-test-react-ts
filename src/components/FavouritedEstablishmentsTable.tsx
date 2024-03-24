import { useContext } from "react";
import styles from "../styles/FavouritedEstablishmentsTable.module.css";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { TypeOfTable } from "../constants";
import { FavouriteItemsContext } from "../context/favouriteItems";

export const FavouritedEstablishmentsTable = () => {
  const establishments = useContext(FavouriteItemsContext);
  if(establishments?.favouriteItem && establishments?.favouriteItem?.length > 0) {
    return (
      <div className={styles.favouriteTable}>
        <h3>Favourite table</h3>
        <EstablishmentsTable type={TypeOfTable.Favourite} establishments={establishments?.favouriteItem} />
      </div>
      )
  } else {
    return <div></div>
  }
  
};
