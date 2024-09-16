import { ReactElement, useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { DrinkCard } from "../components";

export function FavouritesPage(): ReactElement {
    const { favouritesList, setFavouritesList } = useContext(FavouritesContext);

    return (
        <section id="favouritesPage">
            {favouritesList.map((favourite) => (
                <DrinkCard key={favourite.id} drink={favourite} />
            ))}
        </section>
    );
}
