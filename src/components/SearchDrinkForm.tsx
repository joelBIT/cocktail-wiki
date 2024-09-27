import { FormEvent, ReactElement } from "react";

interface ISearchDrinkFormProps {
    handleSubmitSearch: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    searchDrink: string;
    setSearchDrink: (searchDrink: string) => void;
}

export function SearchDrinkForm(props: ISearchDrinkFormProps): ReactElement {
    return (
        <form id="searchDrinkForm" onSubmit={props.handleSubmitSearch}>
            <label htmlFor="searchFormInput">Which drink would you like?</label>
            <div>
                <input
                    autoFocus
                    className="input"
                    id="searchFormInput"
                    onChange={(e) => props.setSearchDrink(e.target.value)}
                    placeholder="Name of drink..."
                    type="text"
                    value={props.searchDrink}
                />
                <button>Search</button>
            </div>
        </form>
    );
}
