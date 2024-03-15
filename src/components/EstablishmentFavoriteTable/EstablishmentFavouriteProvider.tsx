import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { getEstablishmentList } from "../../api/getEstablishmentList";
import {
  getFavouriteItemsStorage,
  removeFavouriteItemStorage,
  setFavouriteItemStorage,
} from "./favouriteStorage";
import { useQuery } from "@tanstack/react-query";
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
  const storedIds = getFavouriteItemsStorage();
  const [items, setItems] = useState<EstablishmentFavourite[]>([]);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["getEstablishmentList"],
    queryFn: () => getEstablishmentList(storedIds),
    enabled: storedIds.length > 0 && items.length === 0,
  });

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
