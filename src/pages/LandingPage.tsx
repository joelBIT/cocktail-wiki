import { ReactElement, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "../components";
import { baseURL, createDrinkCard } from "../utils";

export function LandingPage(): ReactElement {
    const drink_old = useLoaderData() as IDrinkCard;
    const [drink, setDrink] = useState<IDrinkCard>(drink_old);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetches a new random drink from API
    async function handleRandomDrinkButton(): Promise<void> {
        setErrorMessage("");

        try {
            // Send fetch request
            const resp: Response = await fetch(`${baseURL}/random.php`);

            // Data massaging
            const { drinks } = await resp.json();

            // Update data to display
            setDrink(createDrinkCard(drinks[0]));
        } catch (e) {
            console.error(e);
            setErrorMessage("Could not retrieve another drink");
        }
    }

    return (
        <section id="landingPage">
            {errorMessage ? (
                <h1 className="errorMessage">{errorMessage}</h1>
            ) : null}
            {drink ? <DrinkCard drink={drink} /> : <></>}
                <button
                    id="randomDrinkButton"
                    onClick={() => handleRandomDrinkButton()}
                >
                    Show another
                </button>
        </section>
    );
}
