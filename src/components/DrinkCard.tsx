import { Link } from "react-router-dom";
import { IDrinkCard } from "../interfaces";

export function DrinkCard({ drink }: {drink: IDrinkCard}) {
    return (
        <section className="drinkCard">
            <figure>
                <img src={drink.image} alt="Drink" />
            </figure>
            <div className="drinkInfo">
                <Link to={`/cocktailinfo/${drink.id}`}>{drink.name}</Link>
                <p>{drink.alcoholic}</p>
            </div>
        </section>
    );
}
