import { createContext, ReactElement, ReactNode, useState } from "react";
import { IDrinkCard } from "../interfaces";

interface IFavouritesContext {
    favouritesList: IDrinkCard[];
    setFavouritesList: (favouritesList: IDrinkCard[]) => void;
}

interface IFavouritesContextProviderChildren {
    children: ReactNode;
}

export const FavouritesContext = createContext<IFavouritesContext>(
    {} as IFavouritesContext
);

export function FavouritesContexProvider({
    children,
}: IFavouritesContextProviderChildren): ReactElement {
    const [favouritesList, setFavouritesList] = useState<IDrinkCard[]>([]);

    const values = {
        favouritesList,
        setFavouritesList,
    };

    return (
        <FavouritesContext.Provider value={values}>
            {children}
        </FavouritesContext.Provider>
    );
}
