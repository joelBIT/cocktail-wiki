import { Link } from "react-router-dom";
import { IDrinkCard } from "../interfaces";
import { ReactElement } from "react";
import { FavouriteButton } from "./FavouriteButton";

export function DrinkCard({ drink }: { drink: IDrinkCard }): ReactElement {
 
    return (
        <section
            className={drink.isFading ? "is-fading drinkCard" : "drinkCard"}
        >
            <div className="card-fig-plus-name">
                <figure>
                    <Link to={`/cocktailinfo/${drink.id}`}>
                        <div className="card-image-container">
                            <img
                                src={drink.image}
                                alt="Example"
                                className="image"
                            />
                            <div className="card-hover-text">
                                <h5>Go to details</h5>
                            </div>
                        </div>
                    </Link>
                </figure>
                <h3 className="card-name">
                    <Link to={`/cocktailinfo/${drink.id}`}>{drink.name}</Link>
                </h3>
            </div>
            <div className="card-flex-row">
                <p>{drink.alcoholic}</p>
                <FavouriteButton drink={drink} />
            </div>
        </section>
    );
}
