import { ReactElement, useContext } from "react";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { IDrinkCard } from "../interfaces";
import { useLocation } from "react-router-dom";

export function FavouriteButton({ drink }: { drink: IDrinkCard }): ReactElement {
    const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
    const isFavorite = favouritesList.some((fav) => fav.id === drink.id);
    const location = useLocation();

        // Only used for testing the context
        function handleFavourites(): void {
            try {
                if (!isFavorite) {
                    // if the current drink is not already in favoritesList, add it.
                    setFavouritesList([...favouritesList, drink]);
                } else {
                    // if it is, remove it.
                    if (location.pathname === "/favourites") {
                        console.log(location.pathname);
    
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
                    isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >

            </button>
            {/* dynamic button content is handled by :hover and ::after selectors in DrinkCard.css */}
        </div>
    );
}