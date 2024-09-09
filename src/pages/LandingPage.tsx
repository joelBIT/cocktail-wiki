import { ReactElement } from "react";
import "../css/LandingPage.css";

export function LandingPage(): ReactElement {
	return (
		<>
			<h1>Landing Page</h1>
			<article className="cocktail-card card">
				<figure className="cocktail-figure">
					<img className="cocktail-img" src="src/assets/img/cocktail-placeholder.jpg" alt="" />
					{/* <figcaption>Coctail photo</figcaption> */}
				</figure>
				<h3 className="cocktail-card-name">Placeholder name</h3>
				<section className="cocktail-card-tags">
					<div className="cocktail-card-tag tag">Expensive</div>
					<div className="cocktail-card-tag tag">Classic</div>
				</section>
				<div className="cocktail-card-buttons">
					<button className="button-details">Details</button>
					<button className="button-show-another">Show another</button>
				</div>
			</article>
		</>
	);
}
