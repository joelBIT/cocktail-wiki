import { createBrowserRouter, 
    Outlet } from "react-router-dom";
import { CocktailInfoPage, 
    FavouritesPage, 
    IngredientPage, 
    LandingPage, 
    NotFound, 
    SearchPage } from "../pages";
import { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent />,
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

function HomeComponent(): ReactElement {
    return (
        <>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>            
    );
}