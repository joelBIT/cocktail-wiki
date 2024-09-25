import { useLocation } from "react-router-dom";
import { IFavouritesContextProviderChildren } from "../interfaces";
import { useEffect } from "react";

export const ScrollToTop = (props: IFavouritesContextProviderChildren) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
};
