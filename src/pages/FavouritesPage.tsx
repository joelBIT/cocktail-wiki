import { ReactElement } from "react";
import { useFavouritesContext } from "../contexts/FavouritesContextProvider";
import { DrinkCard } from "../components";

export function FavouritesPage(): ReactElement {
    const {favouritesList, setFavouritesList} = useFavouritesContext();

    return (
        <section id="favouritesPage">
            {favouritesList.map(favourite => <DrinkCard drink={favourite} />)}
        </section>
    );
}
