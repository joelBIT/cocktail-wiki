import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export function App(): ReactElement {
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
