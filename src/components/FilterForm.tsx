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
                type="checkbox"
                id="alcoholicFilterInput"
                onChange={() => setNonAlcoholic(!nonAlcoholic)}
                checked={nonAlcoholic}
            />
            <label htmlFor="alcoholicFilterInput" id="alcoholicFilterLabel">
                No alcohol, please!
            </label>{" "}
        </form>
    );
}
