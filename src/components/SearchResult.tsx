import { ReactElement } from "react";
import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "./DrinkCard";
import { PaginateButtons, PaginationForm } from ".";

interface ISearchResultProps {
    currentPage: number;
    drinks: IDrinkCard[] | undefined;
    drinksPerPage: number;
    handleNextDrinks: () => void;
    handlePreviousDrinks: () => void;
    handleSetDrinksPerPage: (drinksPerPage: number) => void;
    paginated: IDrinkCard[];
    totalPages: number;
}

export function SearchResult(props: ISearchResultProps): ReactElement {
    return (
        <article id="searchResult">
            <h2>{props.drinks?.length} drinks found</h2>
            <PaginationForm
                drinksPerPage={props.drinksPerPage}
                handleSetDrinksPerPage={props.handleSetDrinksPerPage}
            />
            <PaginateButtons
                currentPage={props.currentPage}
                handleNextDrinks={props.handleNextDrinks}
                handlePreviousDrinks={props.handlePreviousDrinks}
                totalPages={props.totalPages}
            />
            <section id="searchCardContainer">
                {props.paginated.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} />
                ))}
            </section>
            <PaginateButtons
                currentPage={props.currentPage}
                handleNextDrinks={props.handleNextDrinks}
                handlePreviousDrinks={props.handlePreviousDrinks}
                totalPages={props.totalPages}
            />
        </article>
    );
}
