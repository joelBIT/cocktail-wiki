import { createBrowserRouter } from "react-router-dom";
import { CocktailInfoPage, 
    FavouritesPage, 
    IngredientPage, 
    LandingPage, 
    NotFound,
    SearchPage } from "./pages";
import { App } from "./components/App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '/favourites',
                element: <FavouritesPage />,
            },
            {
                path: '/cocktailinfo/:id',
                element: <CocktailInfoPage />,
            },
            {
                path: '/ingredient/:name',
                element: <IngredientPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    }
]);

