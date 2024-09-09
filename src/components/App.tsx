import { ReactElement } from "react";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";

export function App(): ReactElement {
    return <RouterProvider router={router} />;
}
