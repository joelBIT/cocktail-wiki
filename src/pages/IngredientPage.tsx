import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IIngredientInformation } from "../interfaces";

/**
 * The ingredient page contains information such as if the ingredient contains alcohol, cocktails
 * containing the ingredient, and a description. The page consists of two tabs. One tab contains
 * the information about the ingredient, and the other tab contains a list of all drinks that
 * contains this ingredient. The ingredient description text is collapsible if the text consists
 * of more than one paragraph.
 * 
 * @returns the ingredient page containing information about an ingredient
 */
export function IngredientPage(): ReactElement {
    const ingredient = useLoaderData() as IIngredientInformation;

    return (
        <section id="ingredientTabs">
            <input type="radio" id="tabIngredient" name="tabs" defaultChecked/>
            <label htmlFor="tabIngredient">Ingredient</label>
            <div className="tab">
                <section id="ingredientInformation">
                    <figure>
                        <img
                            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name}-Medium.png`}
                        />
                    </figure>
                    <article id="ingredientDescription">
                        <h1 id="ingredientName">
                            {ingredient.name}
                        </h1>
                        <div id="tags">
                            {ingredient.type ? <p>{ingredient.type}</p> : <></>}
                            <p>{ingredient.alcohol ? "Alcoholic" : "Non-alcoholic"}</p>
                        </div>
                        <p>{ingredient.description.length > 0 ? ingredient.description[0] : <></>}</p>
                        <details>
                            <summary>
                                {ingredient.description.length > 1 ? <span className="material-symbols-outlined">expand_circle_down</span> : <></>}
                            </summary>
                            <div id="description">
                                {ingredient.description.length > 1 ? ingredient.description.slice(1).map(
                                    (paragraph, index) => <p key={index}>{paragraph}</p>
                                ) : <></>}
                            </div>
                        </details>
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
