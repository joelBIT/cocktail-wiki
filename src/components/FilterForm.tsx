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
            <label htmlFor="alcoholicFilterInput" id="alcoholicFilterLabel">
                No alcohol, please!
            </label>
            <input
                type="checkbox"
                id="alcoholicFilterInput"
                onChange={() => setNonAlcoholic(!nonAlcoholic)}
                checked={nonAlcoholic}
            />
        </form>
    );
}
