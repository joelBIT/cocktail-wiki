import { ReactElement, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "../components";

export function LandingPage(): ReactElement {
	const navigate = useNavigate();
	const drink_old = useLoaderData() as IDrinkCard;
	// const drink2 = useLoaderData() as IDrinkCard;
	// const [drink, setDrink] = useState<IDrinkCard | undefined>(drink_old);
	const [drink, setDrink] = useState<IDrinkCard>(drink_old);

	// fetches a new random drink from API
	async function fetchNewRandomDrink<IDrinkCard>() {
		const resp: Response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
		// data massaging
		const { drinks } = await resp.json();
		const drink = drinks[0];
		return {
			id: drink.idDrink,
			name: drink.strDrink,
			alcoholic: drink.strAlcoholic,
			image: drink.strDrinkThumb,
		};
	}

	const handleUpdateRandomDrink = async () => {
		// fetches new drink to display
		const newDrink = await fetchNewRandomDrink<IDrinkCard>();
		setDrink(newDrink);
	};

	return (
		<>
			<DrinkCard drink={drink} />
			<div className="cocktail-card-buttons" id="TEST">
				<button onClick={handleUpdateRandomDrink} className="button-show-another">
					Show another
				</button>
			</div>
		</>
	);
}
