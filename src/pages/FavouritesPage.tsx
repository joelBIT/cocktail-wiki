import { ReactElement, useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../contexts/FavouritesContextProvider";
import { DrinkCard } from "../components";

export function FavouritesPage(): ReactElement {
	const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
	const [randomMessage, setRandomMessage] = useState<string>("");

	const getRandomMessage = (): string => {
		const messages = [
			"This is where your favorites would show up. If you had any! 🍸",
			"No favourite drinks? How boring. 🍹",
			"You know, you look like you could use a new favourite drink. 🥳",
			"You need some favourites! But pleasche drink reschponschibly! 🍻",
			"I hope you don't come here for beer recommendations! 🍺",
			"No preferences? you're just a whatever-goes kind of drinker? Have you tried Mojito? 🍸",
			"It’s time for some wine and cheese… or at least the wine part! 🧀🍷",
			"No burgers to pair with your beer? Sacrilege! 🍔🍺",
			"All dressed up with a cocktail, nowhere to go but the kitchen for snacks. 🍸🍤",
			"Whiskey without steak is like a day without sunshine. 🌞🥩",
			"Margaritas taste better when paired with tacos, but we’ll take one either way. 🌮🍹",
			"Champagne and oysters? Or maybe just the bubbles for now. 🥂🐚",
			"Gin and tonic, hold the cucumber sandwich. It’s all about balance. 🍸🥒",
			"If red wine and pizza had a love child, it would probably be this moment. 🍕🍷",
		];

		const index = Math.floor(Math.random() * messages.length);
		return messages[index];
	};

	useEffect(() => {
		// message is randomly picked on page/component load.
		setRandomMessage(getRandomMessage());
	}, []);

	return (
		<section id="favouritesPage">
			{!favouritesList.length ? <h2>{randomMessage}</h2> : null}
			{favouritesList.map((favourite) => (
				<DrinkCard key={favourite.id} drink={favourite} />
			))}
		</section>
	);
}
