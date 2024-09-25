import {
    IDrinkCard,
    ICocktailResponse,
    ICocktailInformation,
    IIngredientResponse,
    IIngredientInformation,
} from "./interfaces";

export const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";

export function createDrinkCard(drink: ICocktailResponse): IDrinkCard {
    return {
        alcoholic: drink.strAlcoholic,
        id: drink.idDrink,
        image: drink.strDrinkThumb,
        isFading: false,
        name: drink.strDrink,
    };
}

// The strTags property in the response is a string containing tags separated by commas, hence the use of split().
export function createCocktail(drink: ICocktailResponse): ICocktailInformation {
    return {
        drink: drink.strDrink,
        tags: drink.strTags ? drink.strTags.split(",") : [],
        category: drink.strCategory,
        instructions: drink.strInstructions,
        glass: drink.strGlass,
        ingredients: [],
        measures: [],
        imageAddress: drink.strDrinkThumb,
        id: drink.idDrink,
        alcohol: drink.strAlcoholic,
    };
}

// The strDescription property is converted into an array of paragraphs using split().
export function createIngredient(
    ingredient: IIngredientResponse
): IIngredientInformation {
    return {
        name: ingredient.strIngredient,
        type: ingredient.strType,
        description: ingredient.strDescription
            ? ingredient.strDescription.split("\r\n\r\n")
            : [],
        alcohol: ingredient.strAlcohol === "Yes" ? true : false,
        cocktails: [],
    };
}

export function createDrinkCardFromCocktail(
    cocktail: ICocktailInformation
): IDrinkCard {
    return {
        alcoholic: cocktail.alcohol,
        id: cocktail.id,
        image: cocktail.imageAddress,
        isFading: false,
        name: cocktail.drink,
    };
}
