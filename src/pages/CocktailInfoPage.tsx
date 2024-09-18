import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { List } from "../components";
import { ICocktailInformation } from "../interfaces";

/**
 * The cocktail info page includes information such as drink name, ingredients, and instructions 
 * about how to make the drink.
 * 
 * @returns the cocktail info page displaying information about a specific cocktail
 */
export function CocktailInfoPage(): ReactElement {
    const cocktail = useLoaderData() as ICocktailInformation;

    return (
        <section id="cocktailInformation">
            <figure>
                <img src={cocktail.imageAddress} />
            </figure>
            <article>
                <h1>
                    <p>{cocktail.drink}</p>
                </h1>
                <div id="tags">
                    <List list={cocktail.tags} />
                </div>
                <h3>
                    Category: <p>{cocktail.category}</p>
                </h3>
                <article id="ingredients">
                    <h3>Ingredients: </h3>
                    <ul id="ingredientsList">
                        {cocktail.ingredients.map(
                            (ingredient, index) => (
                                <li key={index}>
                                    {cocktail.measures[index] ? cocktail.measures[index] + " " : ""}  
                                    <Link
                                        to={`/ingredient/${ingredient}`}
                                    >
                                        { ingredient}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </article>
                <h3>
                    Serve in: <p>{cocktail.glass}</p>
                </h3>
                <h3>
                    Instructions: <p>{cocktail.instructions}</p>
                </h3>
            </article>
        </section>
    );
}
