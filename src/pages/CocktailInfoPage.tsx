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
        <>
            <section className="cocktail-information">
                <figure>
                    <img src={cocktail.imageAddress} />
                </figure>
                <article>
                    <h1>
                        Drink: <p>{cocktail.drink}</p>
                    </h1>
                    <h3>
                        Category: <p>{cocktail.category}</p>
                    </h3>
                    <h3>Tags: </h3>
                    <List list={cocktail.tags} />
                    <h3>Ingredients: </h3>
                    <ul>
                        {cocktail.ingredients.map(
                            (ingredient, index) => (
                                <li key={index}>
                                    <Link
                                        to={`/ingredient/${ingredient}`}
                                    >
                                        {cocktail.measures[index]} { ingredient}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                    <h3>
                        Serve in: <p>{cocktail.glass}</p>
                    </h3>
                    <h3>
                        Instructions: <p>{cocktail.instructions}</p>
                    </h3>
                </article>
            </section>
        </>
    );
}
