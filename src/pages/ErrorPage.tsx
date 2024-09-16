import { ReactElement } from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage(): ReactElement {
    const error = useRouteError();
    console.log(error);

    return <h1 className="errorMessage">An error occurred while loading the page</h1>
}