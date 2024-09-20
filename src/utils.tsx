import { IDrinkCard, ICocktailResponse, ICocktailInformation, IIngredientResponse, IIngredientInformation } from "./interfaces";

export function createDrinkCard(drink: ICocktailResponse): IDrinkCard {
    return {
        id: drink.idDrink,
        name: drink.strDrink,
        alcoholic: drink.strAlcoholic,
        image: drink.strDrinkThumb,
    };
}

// The strTags property in the response is a string containing tags separated by commas, hence the use of split().
export function createCocktail(drink: ICocktailResponse): ICocktailInformation {
    return {
        drink: drink.strDrink,
        tags: drink.strTags ? drink.strTags.split(',') : [],
        category: drink.strCategory,
        instructions: drink.strInstructions,
        glass: drink.strGlass,
        ingredients: [],
        measures: [],
        imageAddress: drink.strDrinkThumb
    };
}

export function createIngredient(ingredient: IIngredientResponse): IIngredientInformation {
    return {
        name: ingredient.strIngredient,
        type: ingredient.strType,
        description: ingredient.strDescription,
        alcohol: ingredient.strAlcohol === "Yes" ? true : false,
        cocktails: []
    }
}

export const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1';