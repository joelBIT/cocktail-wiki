import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { HamburgerMenu, NavBar } from ".";

export function Header(): ReactElement {

	return (
		<header>
			<Link to="/">
				<h1 id="header-title">Cocktail Wiki</h1>
			</Link>

			<NavBar />
			<HamburgerMenu />
		</header>
	);
}
