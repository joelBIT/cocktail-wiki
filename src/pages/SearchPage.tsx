import { FormEvent, ReactElement, useState } from "react";
import {
    ICocktailResponse,
    ICocktailResponseList,
    IDrinkCard,
    INonAlcoholicDrink,
    INonAlcoholicDrinkList,
} from "../interfaces";
import {
    FilterForm,
    SearchDrinkForm,
    SearchResult,
    Spinner,
} from "../components";
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

    // Acquire a list of all non-alcoholic drinks from API
    const getAllNonAlcoholicDrinks = async (): Promise<
        INonAlcoholicDrink[]
    > => {
        const response: Response = await fetch(
            `${baseURL}/filter.php?a=Non_Alcoholic`
        );
        const { drinks }: INonAlcoholicDrinkList = await response.json();

        return drinks;
    };

    const getAlphabeticalList = (foundDrinks: IDrinkCard[]): IDrinkCard[] => {
        const alphabeticalDrinks = foundDrinks.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        return alphabeticalDrinks;
    };

    // Filter out relevant non-alcoholic drinks from search result
    const getFilteredNonAlcoholicDrincs = (
        allNonAlcoholicDrinks: INonAlcoholicDrink[]
    ): INonAlcoholicDrink[] => {
        const filteredNonAlcoholicDrinks: INonAlcoholicDrink[] =
            allNonAlcoholicDrinks.filter((drink: INonAlcoholicDrink) => {
                return drink.strDrink.toLowerCase().includes(searchDrink);
            });

        return filteredNonAlcoholicDrinks;
    };

    // Acquire card info for found non-alcoholic drinks from API
    const getNonAlcoholicDrinks = async (
        filteredNonAcoholicDrins: INonAlcoholicDrink[]
    ): Promise<IDrinkCard[]> => {
        const nonAlcoholicDrinks: IDrinkCard[] = [];

        for (let drink of filteredNonAcoholicDrins) {
            const response: Response = await fetch(
                `${baseURL}/lookup.php?i=${drink.idDrink}`
            );
            const { drinks }: ICocktailResponseList = await response.json();

            nonAlcoholicDrinks.push(createDrinkCard(drinks[0]));
        }

        return nonAlcoholicDrinks;
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

        // Show the loading spinner
        setLoading(true);

        let foundDrinks: IDrinkCard[] | undefined = undefined;

        // Acquire drinks from API
        try {
            if (nonAlcoholic) {
                // Find non-alcoholic drinks that match search term
                const allNonAlcoholicDrinks = await getAllNonAlcoholicDrinks();
                const filteredNonAcoholicDrins = getFilteredNonAlcoholicDrincs(
                    allNonAlcoholicDrinks
                );

                // Acquire card info for the found non-alcoholic drinks
                const nonAlcoholicDrinks = await getNonAlcoholicDrinks(
                    filteredNonAcoholicDrins
                );

                // If nothing found, make foundDrinks undefined
                foundDrinks =
                    nonAlcoholicDrinks.length > 0
                        ? [...nonAlcoholicDrinks]
                        : undefined;
            } else {
                // Fetch all kinds of drinks
                const response: Response = await fetch(
                    `${baseURL}/search.php?s=${searchDrink}`
                );
                const { drinks }: ICocktailResponseList = await response.json();

                foundDrinks = drinks ? extractDrinkData(drinks) : undefined;
            }

            // Clear the loading spinner
            setLoading(false);

            // Arrange found drinks in alphabetical order
            const alphabeticalList = foundDrinks
                ? getAlphabeticalList(foundDrinks)
                : foundDrinks;

            // Add found drinks to the drinks state
            setDrinks(alphabeticalList);

            if (alphabeticalList) {
                // Put first drinksPerPage number of drinks into paginated state
                setPaginated(alphabeticalList.slice(0, drinksPerPage));

                // Calculate states for pagination info
                setTotalPages(
                    Math.ceil(alphabeticalList.length / drinksPerPage)
                );
                setCurrentPage(1);
            } else {
                throw new Error("Could not find that drink");
            }

            // Reset input field
            setSearchDrink("");
        } catch (e) {
            console.error(e);
            setDrinks(null);
            setPaginated(null);
            setErrorMessage("Could not find that drink");
            setLoading(false);
        }
    };

    return (
        <article id="searchDrink">
            {errorMessage ? (
                <h1 className="errorMessage">{errorMessage}</h1>
            ) : null}

            <SearchDrinkForm
                handleSubmitSearch={handleSubmitSearch}
                searchDrink={searchDrink}
                setSearchDrink={setSearchDrink}
            />

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
                        drinks={drinks ? drinks : undefined}
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
