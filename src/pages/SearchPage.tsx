import { FormEvent, ReactElement, useState } from "react";

export function SearchPage(): ReactElement {
    const [searchDrink, setSearchDrink] = useState<string>("");

    // Fetch drink from API when search form is submitted
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchDrink);
        const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
        const response = await fetch(`${baseURL}/search.php?s=${searchDrink}`);
        const data = await response.json();
        console.log(data);
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
        </>
    );
}
