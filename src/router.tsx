import { createBrowserRouter } from "react-router-dom";
import { CocktailInfoPage, ErrorPage, FavouritesPage, IngredientPage, LandingPage, NotFound, SearchPage } from "./pages";
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
				errorElement: <ErrorPage />,
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
				errorElement: <ErrorPage />,
			},
			{
				path: "/ingredient/:name",
				element: <IngredientPage />,
				loader: ingredientLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
