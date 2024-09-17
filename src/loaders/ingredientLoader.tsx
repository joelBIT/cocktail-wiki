import { IIngredientInformation } from "../interfaces";
import { createDrinkCard, createIngredient } from "../utils";

/**
 * Retrieves an ingredient from the API that corresponds to the supplied name parameter. The response is converted into
 * an IIngredientInformation object. After another API call has been made that populates a list of all cocktails that 
 * uses this ingredient, the IIngredientInformation object is returned to the IngredientPage.
 * 
 * @param name      the name of the ingredient
 * @returns         an IIngredientInformation object
 */
export const ingredientLoader = async ({params}: any) => {
    const ingredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${params.name}`);
    const { ingredients } = await ingredientResponse.json();
    
    let ingredient = createIngredient(ingredients[0]);
    ingredient = await getCocktails(ingredient);

    return ingredient;
}

/**
 * Retrieves a list from the API. This list consists of all cocktails containing the supplied ingredient.
 * All cocktails are pushed into the list of cocktails in the IIngredientInformation object.
 * 
 * @param ingredient    the ingredient of interest
 * @returns 
 */
async function getCocktails(ingredient: IIngredientInformation) {
    const cocktailsResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.name}`);
    const { drinks } = await cocktailsResponse.json();

    for (let i = 0; i < drinks.length; i++) {
        ingredient.cocktails.push(createDrinkCard(drinks[i]));
    }

    return ingredient;
}