import { ReactElement, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "../components";

export function LandingPage(): ReactElement {
	const drink_old = useLoaderData() as IDrinkCard;
	const [drink, setDrink] = useState<IDrinkCard>(drink_old);
	const [errorMessage, setErrorMessage] = useState("");

	// Fetches a new random drink from API
	async function handleRandomDrinkButton() {
		setErrorMessage("");

		try {
			// Send fetch request
			const resp: Response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

			// Data massaging
			const { drinks } = await resp.json();
			const drink = drinks[0];
			const newDrink = {
				id: drink.idDrink,
				name: drink.strDrink,
				alcoholic: drink.strAlcoholic,
				image: drink.strDrinkThumb,
			};

			// Update data to display
			setDrink(newDrink);
		} catch (e) {
			console.error(e);
			setErrorMessage("Could not retrieve another drink");
		}
	}

	return (
		<section id="landingPage">
			<h1 className="errorMessage">{errorMessage}</h1>
			<DrinkCard drink={drink} />
			<button onClick={handleRandomDrinkButton}>Show another</button>
		</section>
	);
}
