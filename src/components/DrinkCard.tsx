import { Link } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { ReactElement, useContext } from "react";

export function DrinkCard({ drink }: { drink: IDrinkCard }): ReactElement {
	const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
	const isFavorite = favouritesList.some((fav) => fav.id === drink.id);

	// Only used for testing the context
	function handleAddToFavourites() {
		try {
			if (!isFavorite) {
				// if the current drink is not already in favoritesList, add it.
				setFavouritesList([...favouritesList, drink]);
			} else {
				// if it is, remove it.
				setFavouritesList(favouritesList.filter((fav) => fav.id !== drink.id));
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<section className="drinkCard">
			<figure>
				<Link to={`/cocktailinfo/${drink.id}`}>
					<div className="card-image-container">
						<img src={drink.image} alt="Example" className="image" />
						<div className="card-hover-text">
							<h5>Go to details</h5>
						</div>
					</div>
				</Link>
			</figure>
			<Link to={`/cocktailinfo/${drink.id}`}>
				<h3 className="card-name">{drink.name}</h3>
			</Link>
			<div className="card-flex-row">
				<p>{drink.alcoholic}</p>
				<div className="button-fav-wrapper">
					<button
						onClick={() => handleAddToFavourites()}
						className={isFavorite ? "material-symbols-outlined button-fav button-remove" : "material-symbols-outlined button-fav button-add"}
						title={isFavorite ? "Remove from favorites" : "Add to favorites"}
					></button>
					{/* dynamic button content is handled by :hover and ::after selectors in DrinkCard.css */}
				</div>
			</div>
		</section>
	);
}
