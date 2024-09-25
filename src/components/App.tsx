import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, ScrollToTop } from ".";
import { FavouritesContexProvider } from "../contexts/FavouritesContextProvider";

export function App(): ReactElement {
    return (
        <FavouritesContexProvider>
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </FavouritesContexProvider>
    );
}
