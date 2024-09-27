import { LoaderFunctionArgs } from "react-router-dom";
import { ICocktailInformation } from "../interfaces";
import { baseURL, createCocktail } from "../utils";

/**
 * Retrieves information about a cocktail from the API. The data of interest is stored in a created object of
 * type ICocktailInformation. Ingredients and measures are converted to arrays due to the API response lacking in
 * arrays.
 * 
 * @param id    the id of the cocktail which has its info retrieved from the API
 * @returns     an ICocktailInformation object for use in the CocktailInfoPage.
 */
export const cocktailInfoLoader = async ({params}: LoaderFunctionArgs): Promise<ICocktailInformation> => {

    const response = await fetch(`${baseURL}/lookup.php?i=${params.id}`);
    const { drinks } = await response.json();
    const drink = drinks[0];
    const cocktail = createCocktail(drink);

    // The response contains 30 properties that are pushed into two arrays  (if they are non-null)
    for (const property in drink) {
        if (property.startsWith('strIngredient') && drink[property]) {  // 15 ingredient properties
            cocktail.ingredients.push(drink[property]);
        }
        if (property.startsWith('strMeasure') && drink[property]) {     // 15 measure properties
            cocktail.measures.push(drink[property]);
        }
    }

    return cocktail;
}
