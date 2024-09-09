import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';

export default function Header(): ReactElement {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => {return isActive ? "active nav-link" : "nav-link";}}>Home</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/favourites">Favourites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}