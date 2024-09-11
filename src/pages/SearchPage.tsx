import { FormEvent, ReactElement, useState } from "react";
import { IFoundDrink } from "../interfaces";
import { DrinkCard } from "../components";

export function SearchPage(): ReactElement {
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<IFoundDrink[] | undefined>();

    // Fetch drink from API when search form is submitted
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send fetch request
        const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
        const response: Response = await fetch(
            `${baseURL}/search.php?s=${searchDrink}`
        );
        const data = await response.json();

        // Extract relevant data of found drinks into a new list
        const foundDrinks: IFoundDrink[] = data["drinks"].map((drink: any) => {
            return {
                id: drink.idDrink,
                name: drink.strDrink,
                alcoholic: drink.strAlcoholic,
                image: drink.strDrinkThumb,
            };
        });

        // Add found drinks to state
        setDrinks(foundDrinks);

        // Reset input field
        setSearchDrink("");
    };

    return (
        <article id="searchDrink">
            <form id="searchDrinkForm" onSubmit={handleOnSubmit}>
                <label className="label" htmlFor="searchFormInput">
                    What do you want to drink?
                </label>
                <div>
                    <input
                        autoFocus
                        className="input"
                        id="searchFormInput"
                        onChange={(e) => setSearchDrink(e.target.value)}
                        placeholder="I feel like a..."
                        type="text"
                        value={searchDrink}
                    />
                    <button className="button">Search</button>
                </div>
            </form>
            <article id="searchResult">
                {drinks ? <h2>Search Result</h2> : undefined}
                <section id="searchCardContainer">
                    {drinks?.map((drink) => (
                        <DrinkCard key={drink.id} drink={drink} />
                    ))}
                </section>
            </article>
        </article>
    );
}
