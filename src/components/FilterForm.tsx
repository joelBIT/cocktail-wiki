import { ReactElement } from "react";

interface IFilterFormProps {
    nonAlcoholic: boolean;
    setNonAlcoholic: (nonAlcoholic: boolean) => void;
}

export function FilterForm({
    nonAlcoholic,
    setNonAlcoholic,
}: IFilterFormProps): ReactElement {
    const handleChange = () => {
        setNonAlcoholic(!nonAlcoholic);
    };

    return (
        <form id="searchFilters">
            <label htmlFor="alcoholicFilterInput" id="alcoholicFilterLabel">
                No alcohol, please!
            </label>
            <input
                type="checkbox"
                id="alcoholicFilterInput"
                onChange={handleChange}
                checked={nonAlcoholic}
            />
        </form>
    );
}
