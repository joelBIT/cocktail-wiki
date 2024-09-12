import { redirect } from "react-router-dom";
import { IDrinkCard, IIngredientInformation } from "../interfaces";

/**
 * Retrieves an ingredient from the API that corresponds to the supplied name parameter. The response is converted into
 * an IIngredientInformation object. After another API call has been made that populates a list of all cocktails that 
 * uses this ingredient, the IIngredientInformation object is returned to the IngredientPage.
 * 
 * @param name      the name of the ingredient
 * @returns         an IIngredientInformation object
 */
export const ingredientLoader = async ({params}: any) => {
    try {
        const ingredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${params.name}`);
        const { ingredients } = await ingredientResponse.json();
        
        let ingredient: IIngredientInformation = {
            name: ingredients[0].strIngredient,
            type: ingredients[0].strType,
            description: ingredients[0].strDescription,
            alcohol: ingredients[0].strAlcohol,
            cocktails: []
        };

        ingredient = await getCocktails(ingredient);

        return ingredient;
    } catch (error) {
        console.log(error);
    }

    return redirect("*");
}

/**
 * Retrieves a list from the API. This list consists of all cocktails containing the supplied ingredient.
 * All cocktails are pushed into the list of cocktails in the IIngredientInformation object.
 * 
 * @param ingredient    the ingredient of interest
 * @returns 
 */
async function getCocktails(ingredient: IIngredientInformation) {
    try {
        const cocktailsResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.name}`);
        const { drinks } = await cocktailsResponse.json();

        for (let i = 0; i < drinks.length; i++) {
            const cocktail: IDrinkCard = {
                id: drinks[i].idDrink,
                name: drinks[i].strDrink,
                alcoholic: "",
                image: ""
            }

            ingredient.cocktails.push(cocktail);
        }
    } catch (error) {
        console.log(error);
    }
    return ingredient;
}