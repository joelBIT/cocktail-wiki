import { ReactElement } from "react";

interface IPaginateButtonsProps {
    currentPage: number;
    handleNextDrinks: () => void;
    handlePreviousDrinks: () => void;
    totalPages: number;
}

export function PaginateButtons(props: IPaginateButtonsProps): ReactElement {
    return (
        <section id="paginateNav">
            <button id="previousDrinks" onClick={() => props.handlePreviousDrinks()}>
                <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <p>
                {props.currentPage} / {props.totalPages}
            </p>
            <button id="nextDrinks" onClick={() => props.handleNextDrinks()}>
                <span className="material-symbols-outlined">skip_next</span>
            </button>
        </section>
    );
}
