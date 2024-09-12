import { IDrinkCard } from "../interfaces";

export const randomCocktailLoader = async (): Promise<IDrinkCard> => {
        const resp = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );

        const { drinks } = await resp.json();
        const drink = drinks[0];
        
        const randomDrink: IDrinkCard = {
            id: drink.idDrink,
            name: drink.strDrink,
            alcoholic: drink.strAlcoholic,
            image: drink.strDrinkThumb,
        }

    return randomDrink;
};