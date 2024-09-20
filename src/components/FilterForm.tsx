import { ReactElement } from "react";

interface IFilterFormProps {
    nonAlcoholic: boolean;
    setNonAlcoholic: (nonAlcoholic: boolean) => void;
}

export function FilterForm({
    nonAlcoholic,
    setNonAlcoholic,
}: IFilterFormProps): ReactElement {
    return (
        <form id="searchFilters">
            <input
                checked={nonAlcoholic}
                id="alcoholicFilterInput"
                onChange={() => setNonAlcoholic(!nonAlcoholic)}
                type="checkbox"
            />
            <label htmlFor="alcoholicFilterInput" id="alcoholicFilterLabel">
                Make that non-alcoholic, please!
            </label>{" "}
        </form>
    );
}
