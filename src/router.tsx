import { createBrowserRouter } from "react-router-dom";
import { CocktailInfoPage, FavouritesPage, IngredientPage, LandingPage, NotFound, SearchPage } from "./pages";
import { App } from "./components";
import { cocktailInfoLoader, randomCocktailLoader, ingredientLoader } from "./loaders";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <LandingPage />,
				loader: randomCocktailLoader,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "/favourites",
				element: <FavouritesPage />,
			},
			{
				path: "/cocktailinfo/:id",
				element: <CocktailInfoPage />,
				loader: cocktailInfoLoader,
			},
			{
				path: "/ingredient/:name",
				element: <IngredientPage />,
				loader: ingredientLoader,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
