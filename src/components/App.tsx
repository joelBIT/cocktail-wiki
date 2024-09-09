import { ReactElement } from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "../pages/LandingPage";
import SearchPage from "../pages/SearchPage";
import FavouritesPage from "../pages/FavouritesPage";
import CocktailInfoPage from "../pages/CocktailInfoPage";
import IngredientPage from "../pages/IngredientPage";
import NotFound from "../pages/NotFound";

export function App(): ReactElement {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route
                        path="/cocktailinfo/:id"
                        element={<CocktailInfoPage />}
                    />
                    <Route
                        path="/ingredients/:name"
                        element={<IngredientPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}
