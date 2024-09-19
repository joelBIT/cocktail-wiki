import { FormEvent, ReactElement, useState } from "react";
import {
    ICocktailResponse,
    ICocktailResponseList,
    IDrinkCard,
    INonAlcoholicDrink,
    INonAlcoholicDrinkList,
} from "../interfaces";
import { FilterForm, SearchResult, Spinner } from "../components";
import { baseURL, createDrinkCard } from "../utils";

export function SearchPage(): ReactElement {
    // States for page loading
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // States for pagination
    const [paginated, setPaginated] = useState<IDrinkCard[] | null>();
    const [drinksPerPage, setDrinksPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    // States for search
    const [nonAlcoholic, setNonAlcoholic] = useState<boolean>(false);
    const [searchDrink, setSearchDrink] = useState<string>("");
    const [drinks, setDrinks] = useState<IDrinkCard[] | null>();

    // Calculate pagination
    const calculatePagination = (
        index: number,
        currentDrinksPerPage: number = drinksPerPage
    ): void => {
        if (drinks && paginated) {
            // Calculate total number of pages
            setTotalPages(Math.ceil(drinks.length / currentDrinksPerPage));

            // Calculate current page
            setCurrentPage(Math.floor(index / currentDrinksPerPage) + 1);
        }
    };

    // Extract relevant data from parsed API response
    const extractDrinkData = (
        foundDrinks: ICocktailResponse[]
    ): IDrinkCard[] => {
        const extractedData = foundDrinks.map((drink: ICocktailResponse) => {
            return createDrinkCard(drink);
        });

        return extractedData;
    };

    // Acquire drink index for pagination
    const getDrinkIndex = (id: string): number => {
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
    const handleNextDrinks = (): void => {
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
    const handlePreviousDrinks = (): void => {
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
    const handleSetDrinksPerPage = (drinksPerPage: number): void => {
        // Set new state for drinksPerPage
        setDrinksPerPage(drinksPerPage);

        // Update pagination with new number of drinksPerPage
        setPaginated(drinks?.slice(0, drinksPerPage));
        calculatePagination(0, drinksPerPage);
    };

    // Fetch drink from API when search form is submitted
    const handleSubmitSearch = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        let foundDrinks: IDrinkCard[] = [];

        // Send fetch request
        try {
            if (nonAlcoholic) {
                // Acquire a list of non-alcoholic drinks
                const response: Response = await fetch(
                    `${baseURL}/filter.php?a=Non_Alcoholic`
                );
                const { drinks }: INonAlcoholicDrinkList =
                    await response.json();

                const filteredDrinks: INonAlcoholicDrink[] = drinks.filter(
                    (drink: INonAlcoholicDrink) => {
                        return drink.strDrink
                            .toLowerCase()
                            .includes(searchDrink);
                    }
                );

                // Acquire card info for all the non-alcoholic drinks found
                const nonAlcoholicDrinks: IDrinkCard[] = [];
                for (let drink of filteredDrinks) {
                    const response: Response = await fetch(
                        `${baseURL}/lookup.php?i=${drink.idDrink}`
                    );
                    const { drinks }: ICocktailResponseList =
                        await response.json();

                    nonAlcoholicDrinks.push(createDrinkCard(drinks[0]));
                }

                foundDrinks = [...nonAlcoholicDrinks];
            } else {
                // Fetch all kinds of drinks
                const response: Response = await fetch(
                    `${baseURL}/search.php?s=${searchDrink}`
                );
                const { drinks }: ICocktailResponseList = await response.json();

                foundDrinks = extractDrinkData(drinks);
            }

            setLoading(false);

            // Add found drinks to drinks state
            setDrinks(foundDrinks);

            // Put first drinksPerPage number of drinks into paginated state
            setPaginated(foundDrinks.slice(0, drinksPerPage));

            // Calculate states for pagination info
            setTotalPages(Math.ceil(foundDrinks.length / drinksPerPage));
            setCurrentPage(1);

            // Reset input field
            setSearchDrink("");
        } catch (e) {
            console.error(e);
            setErrorMessage("Could not find that drink");
            setLoading(false);
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
            <FilterForm
                nonAlcoholic={nonAlcoholic}
                setNonAlcoholic={setNonAlcoholic}
            />

            {loading ? (
                <Spinner />
            ) : (
                paginated && (
                    <SearchResult
                        currentPage={currentPage}
                        drinksPerPage={drinksPerPage}
                        handleNextDrinks={handleNextDrinks}
                        handlePreviousDrinks={handlePreviousDrinks}
                        handleSetDrinksPerPage={handleSetDrinksPerPage}
                        paginated={paginated}
                        totalPages={totalPages}
                    />
                )
            )}
        </article>
    );
}
