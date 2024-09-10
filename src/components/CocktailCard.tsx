import { ICocktail } from "../pages";

interface ICocktailCardProps {
	cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: ICocktailCardProps) {
	return (
		<article className="cocktail-card card">
			{cocktail.strDrink}

			<figure className="cocktail-figure">
				<img className="cocktail-img" src={cocktail.strDrinkThumb} alt="" />
				{/* <figcaption>Coctail photo</figcaption> */}
			</figure>
			<h3 className="cocktail-card-name">{cocktail.strDrink}</h3>
			<section className="cocktail-card-tags">
				<div className="cocktail-card-tag tag">Expensive</div>
				<div className="cocktail-card-tag tag">Classic</div>
			</section>
		</article>
	);
}
