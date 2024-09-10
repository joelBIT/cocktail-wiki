import { FormEvent, ReactElement, useState } from "react";
import { DrinksList } from "../components/DrinksList";
import { json } from "react-router-dom";

export function SearchPage(): ReactElement {
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<object[]>([]);

    // Fetch drink from API when search form is submitted
    const handleOnSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        console.log(searchDrink);

        // Send fetch request
        const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
        const response = await fetch(`${baseURL}/search.php?s=${searchDrink}`);
        console.log("response:", response);
        console.log(typeof response);
        const data = await response.json();

        const receivedDrinks = data["drinks"];
        console.log("receivedDrinks: ", receivedDrinks);
        console.log(typeof receivedDrinks);

        // Store name of drinks in state
        const drinkNames = data.map((obj: any) => {
            return obj;
        });
        console.log("drinkNames:", drinkNames);

        // Reset input field
        // setSearchDrink("");
        // console.log("drinks in state:", drinks);
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
            {/* <DrinksList drinks={drinks} /> */}
        </>
    );
}
