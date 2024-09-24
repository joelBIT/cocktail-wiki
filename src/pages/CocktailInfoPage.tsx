import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FavouriteButton, List } from "../components";
import { ICocktailInformation } from "../interfaces";
import { createDrinkCardFromCocktail } from "../utils";

/**
 * The cocktail info page includes information such as drink name, ingredients, and instructions 
 * about how to make the drink.
 * 
 * @returns the cocktail info page displaying information about a specific cocktail
 */
export function CocktailInfoPage(): ReactElement {
    const cocktail = useLoaderData() as ICocktailInformation;

    return (
        <section id="cocktailPage">
            <h1 id="cocktailHeading">
                Details about the drink
            </h1>
            <section id="cocktailInformation">
                <figure>
                    <img src={cocktail.imageAddress} />
                </figure>
                <article>
                    <h1>
                        {cocktail.drink}
                    </h1>
                    <div id="tags">
                        <List list={[cocktail.glass, cocktail.category, cocktail.alcohol, ...cocktail.tags]} />
                    </div>
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
                    <p>{cocktail.instructions}</p>
                    <FavouriteButton drink={createDrinkCardFromCocktail(cocktail)}/>
                </article>
            </section>
        </section>
    );
}
