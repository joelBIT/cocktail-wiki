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
}

export interface ICocktailResponse {
    idDrink: string;
    strDrink: string;
    strAlcoholic: string;
    strDrinkThumb: string;
    strTags: string;
    strInstructions: string;
    strGlass: string;
    strCategory: string;
}

export interface ICocktailResponseList {
    drinks: ICocktailResponse[];
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
    alcohol: boolean;
    description: string;
    cocktails: IDrinkCard[];
}

export interface IIngredientResponse {
    strIngredient: string;
    strType: string;
    strDescription: string;
    strAlcohol: string;
}

export interface INonAlcoholicDrink {
    idDrink: string;
    strDrink: string;
}

export interface INonAlcoholicDrinkList {
    drinks: INonAlcoholicDrink[];
}
