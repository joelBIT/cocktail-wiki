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
                                return isActive
                                    ? "active"
                                    : "";
                            }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourites">
                            Favourites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
