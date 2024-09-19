import { FormEvent, ReactElement } from "react";

interface IPaginationFormProps {
    drinksPerPage: number;
    handleSetDrinksPerPage: (drinksPerPage: number) => void;
}

export function PaginationForm({
    drinksPerPage,
    handleSetDrinksPerPage,
}: IPaginationFormProps): ReactElement {
    return (
        <form
            id="paginationForm"
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
            <label htmlFor="paginationFormInput">
                showing up to <span>{drinksPerPage}</span> drinks per page
            </label>
            <input
                id="paginationFormInput"
                min="1"
                max="25"
                name="paginationFormInput"
                onChange={(e) =>
                    handleSetDrinksPerPage(parseInt(e.target.value))
                }
                type="range"
                value={drinksPerPage}
            />
        </form>
    );
}
