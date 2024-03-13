import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useFetchEstablishmentList } from "../../hooks/useFetchEstablishmentList";
import {
  getFavouriteItemsStorage,
  removeFavouriteItemStorage,
  setFavouriteItemStorage,
} from "./favouriteStorage";

export type EstablishmentFavourite = Pick<
  EstablishmentDetailDto,
  "FHRSID" | "BusinessName" | "RatingValue"
>;

export const EstablishmentFavouriteContext = createContext<{
  items: EstablishmentFavourite[];
  loading: boolean;
  getIsInFavourite: (id: EstablishmentFavourite["FHRSID"]) => boolean;
  addFavouriteItem: (item: EstablishmentFavourite) => void;
  removeFavouriteItem: (id: EstablishmentFavourite["FHRSID"]) => void;
}>({
  items: [],
  loading: true,
  getIsInFavourite: () => false,
  addFavouriteItem: () => {},
  removeFavouriteItem: () => {},
});

export const removeFromFavourite = (id: EstablishmentFavourite["FHRSID"]) => {};

export const EstablishmentFavouriteProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const { data, loading } = useFetchEstablishmentList(
    getFavouriteItemsStorage()
  );
  const [items, setItems] = useState<EstablishmentFavourite[]>([]);

  useEffect(() => {
    setItems(data?.establishments ?? []);
  }, [data]);

  const getIsInFavourite = (id: EstablishmentFavourite["FHRSID"]) => {
    return items.some((item) => item.FHRSID === id);
  };

  const addFavouriteItem = (item: EstablishmentFavourite) => {
    setFavouriteItemStorage(item.FHRSID);
    setItems([...items, item]);
  };

  const removeFavouriteItem = (id: EstablishmentFavourite["FHRSID"]) => {
    const filtered = items.filter((item) => item.FHRSID !== id);
    removeFavouriteItemStorage(id);
    setItems(filtered);
  };

  return (
    <EstablishmentFavouriteContext.Provider
      value={{
        items,
        loading,
        getIsInFavourite,
        addFavouriteItem,
        removeFavouriteItem,
      }}
    >
      {children}
    </EstablishmentFavouriteContext.Provider>
  );
};
