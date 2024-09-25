import { ReactElement, useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { DrinkCard } from "../components";

export function FavouritesPage(): ReactElement {
	const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
	const [randomMessage, setRandomMessage] = useState<string>("");
	const [messagesList, setMessagesList] = useState<string[]>([]);

	const getRandomMessage = (): string => {
		// returns a random message!
		const messages = [
			"There are currently no favourite drinks to display! 🍸",
			"No favourite drinks? How boring. 🍹",
			"You know, you look like you could use a drink. 🥳",
			"Pleasche drink reschponschibly! 🍻",
			"I hope you don't come here for beer recommendations! 🍺",
			"Have you tried Mojito? 🍸",
		];

		const index = Math.floor(Math.random() * messages.length);
		return messages[index];
	};

	useEffect(() => {
		// Set the random message on component mount
		setRandomMessage(getRandomMessage());
	}, []); // The empty dependency array ensures this runs only on component mount

	return (
		<section id="favouritesPage">
			<h2>{randomMessage}</h2>
			{favouritesList.map((favourite) => (
				<DrinkCard key={favourite.id} drink={favourite} />
			))}
		</section>
	);
}
