import { redirect } from "react-router-dom";
import { ICocktailInformation } from "../interfaces";

/**
 * Retrieves information about a cocktail from the API. The data of interest is stored in a created object of
 * type ICocktailInformation. Ingredients and measures are converted to arrays due to the API response lacking in
 * arrays. The strTags property in the response is a string containing tags separated by commas, hence the use
 * of split().
 * 
 * @param id    the id of the cocktail which has its info retrieved from the API
 * @returns     an ICocktailInformation object for use in the CocktailInfoPage.
 */
export const cocktailInfoLoader = async ({params}: any) => {

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        const { drinks } = await response.json();
        const drink = drinks[0];

        const cocktail: ICocktailInformation = {
            drink: drink.strDrink,
            tags: drink.strTags ? drink.strTags.split(',') : [],
            category: drink.strCategory,
            instructions: drink.strInstructions,
            glass: drink.strGlass,
            ingredients: [],
            measures: [],
            amountPerIngredient: [],
            imageAddress: drink.strDrinkThumb
        };

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
    } catch (error) {
        console.log(error);
    }

    return redirect("*");
}
