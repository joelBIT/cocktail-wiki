import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IIngredientInformation } from "../interfaces";

export function IngredientPage(): ReactElement {
    const ingredient = useLoaderData() as IIngredientInformation;

    return (
        <>
            <section className="ingredient-information">
                <article>
                    <figure>
                        <img
                            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Medium.png`}
                        />
                    </figure>
                    <h3>
                        Type: <p>{ingredient.type}</p>
                    </h3>
                    <h3>
                        Contains alcohol: <p>{ingredient.alcohol}</p>
                    </h3>
                    <h3>Drinks containing {ingredient.name}: </h3>
                    <ul>
                        {ingredient.cocktails.map((cocktail, index) => (
                            <li key={index}>
                                <Link to={`/cocktailinfo/${cocktail.id}`}>
                                    {cocktail.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </article>
                <article className="ingredient-description">
                    <h1>
                        Ingredient: <p>{ingredient.name}</p>
                    </h1>
                    <h3>
                        Description: <p>{ingredient.description}</p>
                    </h3>
                </article>
            </section>
        </>
    );
}
