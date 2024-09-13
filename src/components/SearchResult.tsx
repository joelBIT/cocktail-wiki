import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "./DrinkCard";

interface ISearchResultProps {
    handlePreviousDrinks: () => void;
    handleNextDrinks: () => void;
    paginated: IDrinkCard[];
}

export function SearchResult(props: ISearchResultProps) {
    return (
        <article id="searchResult">
            <h2>Search Result</h2>
            <button id="previousDrinks" onClick={props.handlePreviousDrinks}>
                Previous
            </button>
            <span>? / ?</span>
            <button id="nextDrinks" onClick={props.handleNextDrinks}>
                Next
            </button>
            <section id="searchCardContainer">
                {props.paginated.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} />
                ))}
            </section>
        </article>
    );
}
