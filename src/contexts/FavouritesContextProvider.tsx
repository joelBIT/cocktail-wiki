import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useState } from "react";
import { IDrinkCard } from "../interfaces";

export const FavouritesContext = createContext<FavouritesContext | null>(null);

type FavouritesContext = {
  favouritesList: IDrinkCard[];
  setFavouritesList: Dispatch<SetStateAction<IDrinkCard[]>>;
}

export default function FavouritesContexProvider({children} : {children: ReactNode}): ReactElement {
  const [favouritesList, setFavouritesList] = useState<IDrinkCard[]>([]);

  return (
    <FavouritesContext.Provider value={{favouritesList, setFavouritesList}}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavouritesContext() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavouritesContext must be used within a FavouritesContextProvider');
  }
  return context;
}