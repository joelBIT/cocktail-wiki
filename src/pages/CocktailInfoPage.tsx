import { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";

export function CocktailInfoPage(): ReactElement {
    const { id } = useParams();

    useEffect(() => {});

    return <>{id} Cocktail Info Page</>;
}
