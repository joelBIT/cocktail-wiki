import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavBar } from "./NavBar";

export function Header(): ReactElement {

	return (
		<header>
			<Link to="/">
				<h1 id="header-title">Fantastic Ninjas' Cocktail Wiki</h1>
			</Link>

			<NavBar />
			<HamburgerMenu />
		</header>
	);
}
