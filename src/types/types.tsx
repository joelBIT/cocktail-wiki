
export type CocktailInformation = {
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

export type IngredientInformation = {
    name: string,
    type: string,
    alcohol: string,
    description: string,
    cocktails: string[]
}