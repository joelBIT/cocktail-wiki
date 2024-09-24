import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

export function Header(): ReactElement {
	return (
		<header>
			<Link to="/">
				<h1 id="header-title">Fantastic Ninjas' Cocktail Wiki</h1>
			</Link>

			<nav>
				<ul>
					<li>
						<NavLink to="/">
							<h2>Home</h2>
						</NavLink>
					</li>
					<li>
						<NavLink to="/search">
							<h2>Search</h2>
						</NavLink>
					</li>
					<li>
						<NavLink to="/favourites">
							<h2>Favourites</h2>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
