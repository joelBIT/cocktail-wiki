import { ReactNode } from "react";

export interface ICocktailInformation {
    drink: string;
    tags: string[];
    category: string;
    glass: string;
    instructions: string;
    ingredients: string[];
    imageAddress: string;
    measures: string[];
    amountPerIngredient: string[];
}

export interface IDrinkCard {
    id: string;
    name: string;
    alcoholic: string;
    image: string;
}

export interface IFavouritesContext {
    favouritesList: IDrinkCard[];
    setFavouritesList: (favouritesList: IDrinkCard[]) => void;
}

export interface IFavouritesContextProviderChildren {
    children: ReactNode;
}

export interface IIngredientInformation {
    name: string;
    type: string;
    alcohol: string;
    description: string;
    cocktails: IDrinkCard[];
}
