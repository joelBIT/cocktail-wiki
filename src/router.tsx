import { createBrowserRouter } from "react-router-dom";
import { CocktailInfoPage, FavouritesPage, IngredientPage, LandingPage, NotFound, SearchPage, cocktailsLoader } from "./pages";
import { App } from "./components";

// import { landingLoaderMockupData } from "./pages";
/* 
const mockData = landingLoaderMockupData();
console.log(mockData);
 */
/*
// mock data:
const data = require("./mockData.json");
console.log(data);
 */
/* 
const mock = getDrinksPromise()
	.then((result) => {
		const drinks = result.drinks; // Extract the "drinks" array
		console.log(drinks[0]); // Log the array to the console
	})
	.catch((error) => {
		console.error("Error:", error);
	});
console.log(mock);
 */
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
			},
			{
				path: "/ingredient/:name",
				element: <IngredientPage />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
