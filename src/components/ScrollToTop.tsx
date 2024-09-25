import { useLocation } from "react-router-dom";
import { ReactElement, useEffect } from "react";

export const ScrollToTop = (): ReactElement => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <></>;
};
