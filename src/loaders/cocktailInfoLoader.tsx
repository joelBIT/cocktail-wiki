import { ICocktailInformation } from "../interfaces";

export const cocktailInfoLoader = async ({params}: any) => {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        const { drinks } = await response.json();
        const drink = drinks[0] ? drinks[0] : createEmptyCocktail();

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

        for (const property in drink) {
            if (property.startsWith('strIngredient') && drink[property]) {
                cocktail.ingredients.push(drink[property]);
            }
            if (property.startsWith('strMeasure') && drink[property]) {
                cocktail.measures.push(drink[property]);
            }
        }

        cocktail.ingredients.forEach((ingredient, index) => {
            if (cocktail.measures[index]) {
                cocktail.amountPerIngredient.push(`${cocktail.measures[index]} ${ingredient}`);
            }
        });

        return cocktail;
    } catch (error) {
        console.log(error);
    }

    return createEmptyCocktail();
}

function createEmptyCocktail() {
    const cocktail: ICocktailInformation = {
        drink: "",
        tags: [],
        category: "",
        glass: "",
        instructions: "",
        ingredients: [],
        amountPerIngredient: [],
        measures: [],
        imageAddress: ""
    };

    return cocktail;
}