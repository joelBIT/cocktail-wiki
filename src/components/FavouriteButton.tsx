import { ReactElement, useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { IDrinkCard } from "../interfaces";
import { useLocation } from "react-router-dom";

export function FavouriteButton({
    drink,
}: {
    drink: IDrinkCard;
}): ReactElement {
    const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
    const isFavorite = favouritesList.some((fav) => fav.id === drink.id);
    const location = useLocation();

    function handleFavourites(): void {
        try {
            if (!isFavorite) {
                // Add drink to favourites list
                setFavouritesList([...favouritesList, drink]);
            } else {
                // Remove drink from favourites list
                if (location.pathname === "/favourites") {
                    // When on the favourites page, fade out the card,
                    // then remove it from favourites list
                    let fadingFavouritesList = [...favouritesList];
                    for (let favourite of fadingFavouritesList) {
                        if (favourite.id === drink.id) {
                            favourite.isFading = true;
                        }
                    }

                    setFavouritesList(fadingFavouritesList);

                    setTimeout(() => {
                        setFavouritesList(
                            favouritesList.filter((fav) => fav.id !== drink.id)
                        );
                    }, 600);
                } else {
                    // Otherwise, just remove the card from farourites list
                    setFavouritesList(
                        favouritesList.filter((fav) => fav.id !== drink.id)
                    );
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="button-fav-wrapper">
            <button
                onClick={() => handleFavourites()}
                className={
                    isFavorite
                        ? "material-symbols-outlined button-fav button-remove"
                        : "material-symbols-outlined button-fav button-add"
                }
                title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                }
            ></button>
            {/* dynamic button content is handled by :hover and ::after selectors in DrinkCard.css */}
        </div>
    );
}
