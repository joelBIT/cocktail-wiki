import { ReactElement } from "react";

interface ISearchDrinkFormProps {
    handleSubmitSearch: () => Promise<void>;
    searchDrink: string;
    setSearchDrink: (searchDrink: string) => void;
}

export function SearchDrinkForm(props: ISearchDrinkFormProps): ReactElement {
    return (
        <form id="searchDrinkForm" onSubmit={props.handleSubmitSearch}>
            <label htmlFor="searchFormInput">What do you want to drink?</label>
            <div>
                <input
                    autoFocus
                    className="input"
                    id="searchFormInput"
                    onChange={(e) => props.setSearchDrink(e.target.value)}
                    placeholder="I feel like a..."
                    type="text"
                    value={props.searchDrink}
                />
                <button>Search</button>
            </div>
        </form>
    );
}
