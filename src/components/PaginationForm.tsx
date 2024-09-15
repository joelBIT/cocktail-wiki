import { FormEvent } from "react";

interface IPaginationFormProps {
    drinksPerPage: number;
    setDrinksPerPage: (drinksPerPage: number) => void;
}

export function PaginationForm({
    drinksPerPage,
    setDrinksPerPage,
}: IPaginationFormProps) {
    return (
        <form
            id="paginationForm"
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
            <label htmlFor="paginationFormInput">Drinks per page</label>
            <input
                id="paginationFormInput"
                min="1"
                max="25"
                name="paginationFormInput"
                onChange={(e) => setDrinksPerPage(parseInt(e.target.value))}
                type="number"
                value={drinksPerPage}
            />
        </form>
    );
}
