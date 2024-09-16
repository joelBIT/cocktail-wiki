import { Link } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { useContext } from "react";

export function DrinkCard({ drink }: { drink: IDrinkCard }) {
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
						{/* <img src={drink.image} alt="Drink" /> */}
						<img src={drink.image} alt="Example" className="image" />
						<div className="card-hover-text">
							<h5>Go to details</h5>
						</div>
					</div>
				</Link>
			</figure>
			<div className="drinkInfo">
				<Link to={`/cocktailinfo/${drink.id}`}>{drink.name}</Link>
				<p>{drink.alcoholic}</p>
			</div>
			<button onClick={() => handleAddToFavourites()}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button>
		</section>
	);
}
