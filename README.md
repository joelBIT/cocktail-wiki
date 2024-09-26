# Cocktail-Wiki

<details>
  <summary>Content</summary>

-   [Introductin](#introduction)
-   [Features](#features)

</details>

## Introduction

Cocktail Wiki is a project created by Erik Hallgren, Joel Rollny, and Johan Stjernholm, i.e. the "Fantastic Ninjas". The project showcases skills in React / TypeScript, and is part of an intensive React Frontend development course held by Lexicon, Stockholm, Sweden.

The project is about presenting an interface with a searchable library of cocktails and their ingredients, drawing data from [The Cocktail DB API](https://www.thecocktaildb.com/api.php).

The project utilises several features inherent to React, including Loaders, Context, States, Re-usable Component Design, and Router. Moreover, our working methodology has been deploying agile methods, primarily SCRUM and Kanban.

One key design goal was to create robust code, with explicitly typed variables and functions. Another important goal was to fully utilise the advantages of React State and Context hooks, making user interaction quick and efficient. A third goal was to make the app fully responsive, optimised for a range of different screen sizes.

## Features

-   **Landing Page**

    -   A randomly chosen cocktail is displayed upon loading the page.
    -   New random cocktails may be seem by clicking a button.
    -   By clicking on the cocktail, more information is displayed on the `Cocktail Info Page`.
    -   The cocktail may be added to a Favourites list.

-   **Search Page**

    -   Cocktails are searchable by name.
    -   The cocktails are displayed paginated, in alphabetical order.
    -   By default, up to 10 cocktails are displayed per page, tunable by adjusting a slider.
    -   The pagination slider uses React State and mathematical algorithms for immediate interface updates.
    -   Each cocktail links to a `Cocktail Info Page`.
    -   Ticking the 'non-alcoholic' option, only non-alcoholic drinks will be acquired.
    -   If something goes wrong with the API call, information is displayed to the user.

-   **Favorites Page**

    -   The page displays favourites chosen by the user.
    -   More information about the cocktail may be found by clicking on the cocktail card.
    -   Upon removing a favourite, the cocktail card gradually fades away, making the disappearance less abrupt.
    -   Favorites are stored with the useContext hook.

-   **Cocktail Info Page**

    -   The Cocktail Info Page implements the above functionality of an add favourites button.
    -   Ingredients can be clicked on, leading to the Ingredients page with further information.
    -   The page is responsive and optimised to a range of various screen sizes.

-   **Ingredient Page**

    -   Displays information about the ingredient.
    -   The page is separated by two tabs, the second containing a list of cocktails that contain the ingredient.
    -   The page is responsive and optimised to a range of various screen sizes.

-   **404 page**

    -   In case the user tries to access a page not defined by the Router, the Router redirects to an error page.
