import { ReactElement } from "react";

export function Footer(): ReactElement {
    return (
        <footer id="footer">
            <h1>
                <span className="material-symbols-outlined copyright-symbol">
                    copyright
                </span>
                <span className="copyright-text">Fantastic Ninjas</span>
            </h1>
        </footer>
    );
}
