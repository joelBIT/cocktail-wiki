interface IDrinksProps {
    drinks: string[];
}

export function DrinksList({ drinks }: IDrinksProps) {
    if (drinks.length > 0) {
        return (
            <>
                <p>These are the drinsk found</p>
                {drinks.map((drink: string) => {
                    return <p>{drink}</p>;
                })}
            </>
        );
    }

    return <p>No drinks found yet</p>;
}
