import { ReactElement } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { DrinkCard } from "../components";

export function LandingPage(): ReactElement {
    const navigate = useNavigate();
    const drink = useLoaderData() as IDrinkCard;

    const handleUpdateRandomDrink = () => {
        navigate(0); //detta triggar loadern för den aktuella sidan
    };
    const handleDetailsButton = () => {
        navigate("/cocktailinfo/" + drink.id);
    };

    return (
        <>
            <DrinkCard drink={drink} />
            <div className="cocktail-card-buttons" id="TEST">
                <button
                    onClick={handleDetailsButton}
                    className="button-details"
                >
                    Details
                </button>
                <button
                    onClick={handleUpdateRandomDrink}
                    className="button-show-another"
                >
                    Show another
                </button>
            </div>
        </>
    );
}