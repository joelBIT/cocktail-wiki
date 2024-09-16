import { createContext, ReactElement, useState } from "react";
import {
    IDrinkCard,
    IFavouritesContext,
    IFavouritesContextProviderChildren,
} from "../interfaces";

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
