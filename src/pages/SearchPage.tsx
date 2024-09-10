import { FormEvent, ReactElement, useState } from "react";
import { DrinksList } from "../components/DrinksList";

export function SearchPage(): ReactElement {
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<string[]>([]);

    // Fetch drink from API when search form is submitted
    const handleOnSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        // Send fetch request
        const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
        const response: Response = await fetch(
            `${baseURL}/search.php?s=${searchDrink}`
        );
        const data = await response.json();
        const receivedDrinks = data["drinks"];

        // Store name of drinks in state
        const drinkNames: string[] = receivedDrinks.map(
            (drink: { strDrink: string }) => {
                return drink.strDrink;
            }
        );
        setDrinks(drinkNames);

        // Reset input field
        setSearchDrink("");
    };

    return (
        <>
            {/* Search drink form */}
            <form className="form--search-drink" onSubmit={handleOnSubmit}>
                <label className="label" htmlFor="searchFormInput">
                    Search for a drink
                </label>
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
            </form>

            {/* List drinks from search */}
            <DrinksList drinks={drinks} />
        </>
    );
}
