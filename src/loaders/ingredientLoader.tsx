import { Cocktail, IngredientInformation } from "../types/types";

export const ingredientLoader = async ({params}: any) => {
    try {
        const ingredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${params.name}`);
        const { ingredients } = await ingredientResponse.json();

        const retrievedIngredient = ingredients[0] ? ingredients[0] : createEmptyIngredient();
        
        let ingredient: IngredientInformation = {
            name: retrievedIngredient.strIngredient,
            type: retrievedIngredient.strType,
            description: retrievedIngredient.strDescription,
            alcohol: retrievedIngredient.strAlcohol,
            cocktails: []
        };

        ingredient = await getCocktails(ingredient, params.name);

        return ingredient;
    } catch (error) {
        console.log(error);
    }

    return createEmptyIngredient();
}

async function getCocktails(ingredient: IngredientInformation, name: string) {
    try {
        const cocktailsResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
        const { drinks } = await cocktailsResponse.json();

        for (let i = 0; i < drinks.length; i++) {
            const cocktail: Cocktail = {
                id: drinks[i].idDrink,
                name: drinks[i].strDrink
            }

            ingredient.cocktails.push(cocktail);
        }
    } catch (error) {
        console.log(error);
    }
    return ingredient;
}

function createEmptyIngredient() {
    const ingredient: IngredientInformation = {
        name: "",
        type: "",
        description: "",
        alcohol: "",
        cocktails: []
    };

    return ingredient;
}