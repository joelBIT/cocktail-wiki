import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "./DrinkCard";

interface ISearchResultProps {
    currentPage: number;
    handlePreviousDrinks: () => void;
    handleNextDrinks: () => void;
    paginated: IDrinkCard[];
    totalPages: number;
}

export function SearchResult(props: ISearchResultProps) {
    return (
        <article id="searchResult">
            <h2>Search Result</h2>
            <div id="paginateNav">
                <button
                    id="previousDrinks"
                    onClick={props.handlePreviousDrinks}
                >
                    <span className="material-symbols-outlined">
                        skip_previous
                    </span>
                </button>
                <p>
                    {props.currentPage} / {props.totalPages}
                </p>
                <button id="nextDrinks" onClick={props.handleNextDrinks}>
                    <span className="material-symbols-outlined">skip_next</span>
                </button>
            </div>

            <section id="searchCardContainer">
                {props.paginated.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} />
                ))}
            </section>
        </article>
    );
}
