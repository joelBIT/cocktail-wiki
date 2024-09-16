import { FormEvent, ReactElement, useState } from "react";
import { IDrinkCard } from "../interfaces";
import { SearchResult } from "../components";

export function SearchPage(): ReactElement {
    const [errorMessage, setErrorMessage] = useState("");
    // States for search
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<IDrinkCard[] | null>();
    // States for pagination
    const [paginated, setPaginated] = useState<IDrinkCard[] | null>();
    const [drinksPerPage, setDrinksPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Calculate pagination
    const calculatePagination = (
        index: number,
        currentDrinksPerPage: number = drinksPerPage
    ) => {
        if (drinks && paginated) {
            // Calculate total number of pages
            setTotalPages(Math.ceil(drinks.length / currentDrinksPerPage));

            // Calculate current page
            setCurrentPage(Math.floor(index / currentDrinksPerPage) + 1);
        }
    };

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
                // If not, update paginated state with next slice from drinks
                setPaginated(
                    drinks.slice(drinkIndex + 1, drinkIndex + 1 + drinksPerPage)
                );
                calculatePagination(drinkIndex + 1);
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

            // Check if approaching beginning of drinks list
            if (drinkIndex > 0 && drinkIndex < drinksPerPage) {
                // If so, update paginated state with slice from 0 to drinksPerPage
                setPaginated(drinks.slice(0, drinksPerPage));
                calculatePagination(drinkIndex - 1);
            } else if (drinkIndex > 0) {
                // Update paginated state with previous slice from drinks
                setPaginated(
                    drinks.slice(drinkIndex - drinksPerPage, drinkIndex)
                );
                calculatePagination(drinkIndex - 1);
            }
        }
    };

    // Reset search display when drinksPerPage state is updated
    const handleSetDrinksPerPage = (drinksPerPage: number) => {
        // Set new state for drinksPerPage
        setDrinksPerPage(drinksPerPage);

        // Update pagination with new number of drinksPerPage
        setPaginated(drinks?.slice(0, drinksPerPage));
        calculatePagination(0, drinksPerPage);
    };

    // Fetch drink from API when search form is submitted
    const handleSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        // Send fetch request
        try {
            const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
            const response: Response = await fetch(
                `${baseURL}/search.php?s=${searchDrink}`
            );
            const data = await response.json();

            // Add found drinks to drinks state
            setDrinks(extractDrinkData(data));

            // Put first drinksPerPage number of drinks into paginated state
            setPaginated(extractDrinkData(data).slice(0, drinksPerPage));

            // Calculate states for pagination info
            setTotalPages(Math.ceil(data["drinks"].length / drinksPerPage));
            setCurrentPage(1);

            // Reset input field
            setSearchDrink("");
        } catch (e) {
            console.error(e);
            setErrorMessage("Could not find that drink");
        }
    };

    return (
        <article id="searchDrink">
            <h1 className="errorMessage">{errorMessage}</h1>
            <form id="searchDrinkForm" onSubmit={handleSubmitSearch}>
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
                    currentPage={currentPage}
                    drinksPerPage={drinksPerPage}
                    handleNextDrinks={handleNextDrinks}
                    handlePreviousDrinks={handlePreviousDrinks}
                    handleSetDrinksPerPage={handleSetDrinksPerPage}
                    paginated={paginated}
                    totalPages={totalPages}
                />
            )}
        </article>
    );
}
