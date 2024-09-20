import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IIngredientInformation } from "../interfaces";

/**
 * The ingredient page contains information such as if the ingredient contains alcohol, cocktails
 * containing the ingredient, and a description.
 * 
 * @returns the ingredient page containing information about an ingredient
 */
export function IngredientPage(): ReactElement {
    const ingredient = useLoaderData() as IIngredientInformation;

    return (
        <section id="ingredientTabs">
            <input type="radio" id="tabIngredient" name="tabs" defaultChecked/>
            <label htmlFor="tabIngredient">Ingredients</label>
            <div className="tab">
                <section id="ingredientInformation">
                    <article>
                        <figure>
                            <img
                                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Medium.png`}
                            />
                        </figure>
                    </article>
                    <article id="ingredientDescription">
                        <h1>
                            {ingredient.name}
                        </h1>
                        <div id="tags">
                            <p>{ingredient.type}</p>
                            <p>{ingredient.alcohol ? "Alcoholic" : "Non-alcoholic"}</p>
                        </div>
                        <p>{ingredient.description}</p>
                    </article>
                </section>
            </div>

            <input type="radio" id="tabDrinks" name="tabs" />
            <label htmlFor="tabDrinks">Drinks</label>
            <div className="tab">
                <section id="drinksList">
                    <h3>Drinks containing {ingredient.name} </h3>
                    <ul>
                        {ingredient.cocktails.map((cocktail, index) => (
                            <li key={index}>
                                <Link to={`/cocktailinfo/${cocktail.id}`}>
                                    {cocktail.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </section>
    );
}
