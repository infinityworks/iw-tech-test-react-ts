const LOCAL_STORAGE_KEY = "favEstablishments";

type FavouriteEstablishments = number[];

export const getFavouriteItemsStorage = (): FavouriteEstablishments => {
  const val = localStorage.getItem(LOCAL_STORAGE_KEY);
  return val !== null ? JSON.parse(val) : [];
};

export const setFavouriteItemStorage = (key: number) => {
  const newValue = [...getFavouriteItemsStorage(), key];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
};

export const removeFavouriteItemStorage = (key: number) => {
  const newValue = getFavouriteItemsStorage().filter(
    (favourite) => favourite !== key
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
};
