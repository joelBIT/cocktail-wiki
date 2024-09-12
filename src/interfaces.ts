export interface IFoundDrink {
    id: string;
    name: string;
    alcoholic: string;
    image: string;
}

export interface ICocktailInformation {
    drink: string,
    tags: string[],
    category: string,
    glass: string,
    instructions: string,
    ingredients: string[],
    imageAddress: string,
    measures: string[],
    amountPerIngredient: string[]
}

export interface IIngredientInformation {
    name: string,
    type: string,
    alcohol: string,
    description: string,
    cocktails: IFoundDrink[]
}