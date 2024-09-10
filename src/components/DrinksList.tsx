interface IDrinksProps {
    drinks: string[];
}

export function DrinksList({ drinks }: IDrinksProps) {
    return (
        <>
            <p>These are the drinsk found</p>
            {drinks.map((drink: string) => {
                <p>{drink}</p>;
            })}
        </>
    );
}
