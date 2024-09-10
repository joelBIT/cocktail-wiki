import { ReactElement } from "react";

export function List({list} : {list: string[]}): ReactElement {
    
    return (
        <ul>
            {list.map((item, index) => 
                <li key={index}>
                    {item}
                </li>
            )}
        </ul>
    );
}