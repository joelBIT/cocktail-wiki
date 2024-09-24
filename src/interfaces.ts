import { ReactNode } from "react";

export interface ICocktailInformation {
    id: string;
    drink: string;
    tags: string[];
    category: string;
    glass: string;
    instructions: string;
    ingredients: string[];
    imageAddress: string;
    measures: string[];
    alcohol: string;
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
    alcoholic: string;
    id: string;
    image: string;
    isFading: boolean;
    name: string;
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
    description: string[];
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
