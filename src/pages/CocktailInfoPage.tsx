import { ReactElement } from "react";
import { Link, useLoaderData } from "react-router-dom";
import '../css/CocktailInfoPage.css';
import { CocktailInformation } from "../types/types";
import { List } from "../components";

export function CocktailInfoPage(): ReactElement {
    const cocktail = useLoaderData() as CocktailInformation;

    return (
        <>
            <section className="cocktail-information">
                <figure> 
                    <img src={cocktail.imageAddress} />
                </figure>
                <article>
                    <h1>Drink: <p>{cocktail.drink}</p></h1>
                    <h3>Category: <p>{cocktail.category}</p></h3>
                    <h3>Tags: </h3>
                    <List list={cocktail.tags}/>
                    <h3>Ingredients: </h3>
                    <ul>
                        {cocktail.amountPerIngredient.map((ingredient, index) => (
                            <li key={index}>
                                <Link to={`/ingredient/${cocktail.ingredients[index]}`}>{ingredient}</Link>
                            </li>
                        ))}
                    </ul>
                    <h3>Serve in: <p>{cocktail.glass}</p></h3>
                    <h3>Instructions: <p>{cocktail.instructions}</p></h3>
                </article>
            </section>
        </>
    );
}