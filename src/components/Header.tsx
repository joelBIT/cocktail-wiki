import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

export function Header(): ReactElement {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) => {
								return isActive ? "active" : "";
							}}
						>
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
