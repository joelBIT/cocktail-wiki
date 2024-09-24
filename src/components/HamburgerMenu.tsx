import { ReactElement, useState } from "react";
import { NavBar } from "./NavBar";

export function HamburgerMenu(): ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav id="hamburger">
			<button onClick={() => setIsOpen(!isOpen)}>
                <span className="material-symbols-outlined">menu</span>
            </button>
            {isOpen && <div onClick={() => setIsOpen(!isOpen)}><NavBar /></div>}
		</nav>
    );
}