import { ReactElement } from "react";
import { useLoaderData } from "react-router-dom";
import { IngredientInformation } from "../types/types";
import { List } from "../components";
import "../css/IngredientPage.css";

export function IngredientPage(): ReactElement {
    const ingredient = useLoaderData() as IngredientInformation;

    return (
        <>
            <section className="ingredient-information">
                <article>
                    <figure> 
                        <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Medium.png`} />
                    </figure>
                    <h3>Type: <p>{ingredient.type}</p></h3>
                    <h3>Contains alcohol: <p>{ingredient.alcohol}</p></h3>
                    <h3>Drinks containing {ingredient.name}: </h3>
                    <List list={ingredient.cocktails}/>
                </article>
                <article className="ingredient-description">
                    <h1>Ingredient: <p>{ingredient.name}</p></h1>
                    <h3>Description: <p>{ingredient.description}</p></h3>
                </article>
            </section>
        </>
    );
}
