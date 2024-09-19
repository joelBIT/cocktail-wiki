import { IDrinkCard } from "../interfaces";
import { baseURL, createDrinkCard } from "../utils";

/**
 * Retrieves information about a cocktail from the API. Massages the data a bit, and the returns what is of interest as an object of type IDrinkCard.
 *
 * @returns     an IDrinkCard object for use in LandingPage. Or redirects to 404 page if it failed.
 */
export const randomCocktailLoader = async (): Promise<IDrinkCard> => {
	// Send fetch request
	const resp = await fetch(`${baseURL}/random.php`);

	// Data massaging
	const { drinks } = await resp.json();

	return createDrinkCard(drinks[0]);
};
