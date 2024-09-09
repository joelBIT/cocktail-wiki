import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export function IngredientPage(): ReactElement {
    const { name } = useParams();

    return <>{name} Ingredient Page</>;
}
