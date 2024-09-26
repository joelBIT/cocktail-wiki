import { IDrinkCard } from "../interfaces";
import { baseURL, createDrinkCard } from "../utils";

/**
 * Retrieves information about a cocktail from the API. Converts the data into an object of type IDrinkCard.
 *
 * @returns     an IDrinkCard object
 */
export const randomCocktailLoader = async (): Promise<IDrinkCard> => {
	const resp = await fetch(`${baseURL}/random.php`);
	const { drinks } = await resp.json();

	return createDrinkCard(drinks[0]);
};
