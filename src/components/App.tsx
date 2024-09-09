import { ReactElement } from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import {
    LandingPage,
    SearchPage,
    FavouritesPage,
    CocktailInfoPage,
    IngredientPage,
    NotFound,
} from "../pages";

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
