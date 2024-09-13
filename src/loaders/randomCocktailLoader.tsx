import { redirect } from "react-router-dom";
import { IDrinkCard } from "../interfaces";

/**
 * Retrieves information about a cocktail from the API. Massages the data a bit, and the returns what is of interest as an object of type IDrinkCard.
 *
 * @returns     an IDrinkCard object for use in LandingPage. Or redirects to 404 page if it failed.
 */

// export const randomCocktailLoader = async () => {
export const randomCocktailLoader = async () => {
	try {
		// Send fetch request
		const resp = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

		// Data massaging
		const { drinks } = await resp.json();
		const drink = drinks[0];
		const randomDrink: IDrinkCard = {
			id: drink.idDrink,
			name: drink.strDrink,
			alcoholic: drink.strAlcoholic,
			image: drink.strDrinkThumb,
		};

		return randomDrink;
	} catch (e) {
		console.error(e);
		return redirect("*");
	}
};
