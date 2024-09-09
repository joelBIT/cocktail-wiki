import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from ".";

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
