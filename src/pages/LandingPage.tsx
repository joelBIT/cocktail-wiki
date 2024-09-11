import { ReactElement, useEffect, useState } from "react";
import "../css/LandingPage.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CocktailCard } from "../components/CocktailCard";

type Nullable = string | null;
export interface ICocktail {
	idDrink: string;
	strDrink: string;
	strDrinkAlternate: Nullable;
	strTags: Nullable;
	strVideo: Nullable;
	strCategory: string;
	strIBA: string;
	strAlcoholic: string;
	strGlass: string;
	strInstructions: string;
	strInstructionsES: Nullable;
	strInstructionsDE: Nullable;
	strInstructionsFR: Nullable;
	strInstructionsIT: Nullable;
	strInstructionsZH_HANS: Nullable;
	strInstructionsZH_HANT: Nullable;
	strDrinkThumb: string;
	strIngredient1: Nullable;
	strIngredient2: Nullable;
	strIngredient3: Nullable;
	strIngredient4: Nullable;
	strIngredient5: Nullable;
	strIngredient6: Nullable;
	strIngredient7: Nullable;
	strIngredient8: Nullable;
	strIngredient9: Nullable;
	strIngredient10: Nullable;
	strIngredient11: Nullable;
	strIngredient12: Nullable;
	strIngredient13: Nullable;
	strIngredient14: Nullable;
	strIngredient15: Nullable;
	strMeasure1: Nullable;
	strMeasure2: Nullable;
	strMeasure3: Nullable;
	strMeasure4: Nullable;
	strMeasure5: Nullable;
	strMeasure6: Nullable;
	strMeasure7: Nullable;
	strMeasure8: Nullable;
	strMeasure9: Nullable;
	strMeasure10: Nullable;
	strMeasure11: Nullable;
	strMeasure12: Nullable;
	strMeasure13: Nullable;
	strMeasure14: Nullable;
	strMeasure15: Nullable;
	strImageSource: string;
	strImageAttribution: string;
	strCreativeCommonsConfirmed: string;
	dateModified: string;
}

export const cocktailsLoader = async (): Promise<ICocktail[]> => {
	const resp = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

	const data = await resp.json();
	return data.drinks;
};

export function LandingPage(): ReactElement {
	const navigate = useNavigate();
	const cocktails = useLoaderData() as ICocktail[];
	const [randomCocktail, setRandomCocktail] = useState<ICocktail[]>([]);

	useEffect(() => {
		if (cocktails) {
			setRandomCocktail(cocktails);
		}
	}, []);

	const handleUpdateRandomDrink = () => {
		navigate(0); //detta triggar loadern för den aktuella sidan
	};
	const handleDetailsButton = () => {
		navigate("/cocktailinfo/" + "11007"); //detta triggar loadern för den aktuella sidan
	};

	return (
		<>
			<h1>Landing Page</h1>
			{randomCocktail && randomCocktail.map((cocktail, i) => <CocktailCard cocktail={cocktail} key={i} />)}

			<div className="cocktail-card-buttons">
				<button onClick={handleDetailsButton} className="button-details">
					Details
				</button>
				<button onClick={handleUpdateRandomDrink} className="button-show-another">
					Show another
				</button>
			</div>
		</>
	);
}
