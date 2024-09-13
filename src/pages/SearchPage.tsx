import { FormEvent, ReactElement, useState } from "react";
import { IDrinkCard } from "../interfaces";
import { SearchResult } from "../components";

export function SearchPage(): ReactElement {
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<IDrinkCard[] | null>();
    const [paginated, setPaginated] = useState<IDrinkCard[] | null>();

    // Set a pagination constant
    const N: number = 10;

    // Extract relevant data from parsed API response
    const extractDrinkData = (data: any): IDrinkCard[] => {
        const extractedData = data["drinks"].map((drink: any) => {
            return {
                id: drink.idDrink,
                name: drink.strDrink,
                alcoholic: drink.strAlcoholic,
                image: drink.strDrinkThumb,
            };
        });

        return extractedData;
    };

    // Acquire drink index for pagination
    const getDrinkIndex = (id: string) => {
        if (drinks) {
            for (let drink of drinks) {
                if (drink.id === id) {
                    return drinks.indexOf(drink);
                }
            }
        }
        // Drink not found
        return -1;
    };

    // Next Drinks button clicked
    const handleNextDrinks = () => {
        if (paginated && drinks) {
            // Get id of last drink in paginated state
            const drinkId: string = paginated[paginated.length - 1].id;

            // Find drink with above ID in drinks state
            const drinkIndex: number = getDrinkIndex(drinkId);

            // Check if last drink in search result is reached
            if (drinkIndex !== drinks.length - 1 && drinkIndex !== -1) {
                // Update paginated state with next slice from drinks
                setPaginated(drinks.slice(drinkIndex + 1, drinkIndex + 1 + N));
            }
        }
    };

    // Previous Drinks button clicked
    const handlePreviousDrinks = () => {
        if (paginated && drinks) {
            // Get id of first drink in paginated state
            const drinkId: string = paginated[0].id;

            // Find drink with above ID in drinks state
            const drinkIndex: number = getDrinkIndex(drinkId);

            // Check if first drink in search result is reached
            if (drinkIndex !== 0 && drinkIndex !== -1) {
                // Update paginated state with previous slice from drinks
                setPaginated(drinks.slice(drinkIndex - N, drinkIndex));
            }
        }
    };

    // Fetch drink from API when search form is submitted
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send fetch request
        try {
            const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
            const response: Response = await fetch(
                `${baseURL}/search.php?s=${searchDrink}`
            );
            const data = await response.json();

            // Add found drinks to drinks state
            setDrinks(extractDrinkData(data));

            // Put first N drinks into paginated state
            setPaginated(extractDrinkData(data).slice(0, N));

            // Reset input field
            setSearchDrink("");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <article id="searchDrink">
            <form id="searchDrinkForm" onSubmit={handleOnSubmit}>
                <label htmlFor="searchFormInput">
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
                    <button>Search</button>
                </div>
            </form>

            {paginated && (
                <SearchResult
                    handleNextDrinks={handleNextDrinks}
                    handlePreviousDrinks={handlePreviousDrinks}
                    paginated={paginated}
                />
            )}
        </article>
    );
}
