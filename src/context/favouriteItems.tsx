import { createContext } from "react";
export interface FavouriteItemsContextType {
  favouriteItem: { [key: string]: string }[] | null | undefined;
  saveFavouriteItem: (newData: { [key: string]: string} | null | undefined) => void; 
  removeItem: (id: string) => void;
}

export const FavouriteItemsContext = createContext<FavouriteItemsContextType | null>(null);