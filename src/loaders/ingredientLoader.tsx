import { redirect } from "react-router-dom";
import { IFoundDrink, IIngredientInformation } from "../interfaces";

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

        ingredient = await getCocktails(ingredient, params.name);

        return ingredient;
    } catch (error) {
        console.log(error);
    }

    return redirect("*");
}

async function getCocktails(ingredient: IIngredientInformation, name: string) {
    try {
        const cocktailsResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
        const { drinks } = await cocktailsResponse.json();

        for (let i = 0; i < drinks.length; i++) {
            const cocktail: IFoundDrink = {
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