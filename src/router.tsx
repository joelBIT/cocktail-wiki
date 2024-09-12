import { createBrowserRouter } from "react-router-dom";
import { CocktailInfoPage, FavouritesPage, IngredientPage, LandingPage, NotFound, SearchPage, cocktailsLoader } from "./pages";
import { App } from "./components";
import { cocktailInfoLoader, ingredientLoader } from "./loaders";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <LandingPage />,
				loader: cocktailsLoader,
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
