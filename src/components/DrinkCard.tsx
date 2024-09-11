import { Link } from "react-router-dom";
import { IFoundDrink } from "../interfaces";

interface IFoundDrinkProps {
    drink: IFoundDrink;
}

export function DrinkCard({ drink }: IFoundDrinkProps) {
    return (
        <section className="drink-card">
            <figure>
                <img src={drink.image} alt="Drink" />
            </figure>
            <div className="drink-info">
                <Link to={`/cocktailinfo/${drink.id}`}>{drink.name}</Link>
                <p>{drink.alcoholic}</p>
            </div>
        </section>
    );
}
