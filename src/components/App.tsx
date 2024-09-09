import { ReactElement } from "react";
import LandingPage from "./LandingPage";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import FavouritesPage from "./FavouritesPage";
import NotFound from "./NotFound";
import CocktailInfoPage from "./CocktailInfoPage";
import IngredientPage from "./IngredientPage";
import Footer from "./Footer";

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
