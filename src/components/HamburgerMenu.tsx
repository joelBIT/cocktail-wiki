import { ReactElement, useState } from "react";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";

export function HamburgerMenu(): ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav id="hamburger">
            <button onClick={() => setIsOpen(!isOpen)}>
                <span className="material-symbols-outlined">{isOpen ? "close" : "menu" }</span>
            </button>
            <Link to="/">
                <h1 id="header-title">Cocktail Wiki</h1>
            </Link>
            {isOpen && <div onClick={() => setIsOpen(!isOpen)}><NavBar /></div>}
        </nav>
    );
}