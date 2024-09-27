import { FormEvent, ReactElement } from "react";

interface ISearchDrinkFormProps {
    handleSubmitSearch: (e: FormEvent<HTMLFormElement>) => Promise<void>;
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
                    placeholder="What's the name of that drink...?"
                    type="text"
                    value={props.searchDrink}
                />
                <button>Search</button>
            </div>
        </form>
    );
}
