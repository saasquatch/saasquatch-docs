@owner:lilla
@author:lilla

Feature: Navigating Sidenav
    This allows users to easily navigate and select between articles and categories within our help center site

    @ui
    @motivating
    Scenario Outline: Default menu item state in the side navigation bar
        Given a user looks at the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>
        And the arrow points <arrowDirection>

        Examples:

            | <menuItem>                                  | <backgroundColor> | <textColor>         | <textType> | <iconColor>         | <dropdownLine>      | <arrowDirection> |
            | Core Category Section                       | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Core Category Section with navigation arrow | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | to the right     |
            | Parent                                      | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Parent with dropdown arrow                  | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | down             |
            | Child                                       | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | N/A              |
            | Child with dropdown arrow                   | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | down             |

    @ui
    @motivating
    Scenario Outline: Hovered menu item state in the side navigation bar
        Given a user hovers over the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>

        Examples:

            | <menuItem>                                  | <backgroundColor>    | <textColor>         | <textType> | <iconColor>         | <dropdownLine>      | <arrowDirection> |
            | Core Category Section                       | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Core Category Section with navigation arrow | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | to the right     |
            | Parent                                      | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Parent with dropdown arrow                  | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | down             |
            | Child                                       | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | N/A              |
            | Child with dropdown arrow                   | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | down             |

    @ui
    @motivating
    Scenario Outline: Selected menu item state in the side navigation bar
        Given a user selects the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>

        Examples:

            | <menuItem>                                  | <backgroundColor>   | <textColor>         | <textType> | <iconColor> | <dropdownLine>                                        | <arrowDirection> | <action>                              |
            | Core Category Section                       | 003B45 (dark green) | FFFFFF              | bold       | FFFFFF      | 003B45 (dark green)                                   | N/A              | corresponding content page opening up |
            | Core Category Section with navigation arrow | N/A                 | N/A                 | N/A        | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |
            | Parent                                      | 003B45 (dark green) | FFFFFF              | N/A        | N/A         | 003B45 (dark green)                                   | N/A              | corresponding content page opening up |
            | Parent with dropdown arrow                  | FFFFFF              | 003B45 (dark green) | bold       | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |
            | Child                                       | 003B45 (dark green) | FFFFFF              | bold       | N/A         | dropdown line changes to 2px width and green (06966F) | N/A              | corresponding content page opening up |
            | Child with dropdown arrow                   | FFFFFF              | 003B45 (dark green) | bold       | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |

    @ui
    Scenario: When a page is not found a custom 404 error page is displayed
        Given the user clicks on a link which is not available
        Then they see a 404 Page Not Found message
        And they see a custom design with Squatchy sitting in the middle of the 0
        And a message:
            """Please excuse the mess—We are in the process of making our documentation even better.
    If you cannot find the information you're looking for, let our Success team know, and they will be more than happy to provide!"""

    @ui
    Scenario: The logo at the top of the side navbar takes you to the "https://docs.saasquatch.com/" page
        Given the user is on any page of the docs portal
        When they click the SaaSquatch logo at the top of the navigation bar
        Then the navigation bar has every dropdown closed
        And shows the 6 main menu items
        And the central section of the page shows the "help center" search page
        And the url is "https://docs.saasquatch.com/"

    Scenario: There is a search box at the top of the side navbar (more specs available in a separate file for Search)
        Given the user is on the SaaSquatch docs page at any location
        Then a search input field is shown in the sidebar
        And the default state for the search input field is empty

    Scenario: In the side navbar there are different menu item types
        Given the user is on the docs portal
        Then they see the following side navbar item types

            | types                                                    |
            | Core Category Section with navigation arrow              |
            | Core Category Section with icon only                     |
            | Navigation item with an arrow down                       |
            | Article item                                             |
            | Core category item at the top of the navbar with an icon |

    Scenario: The Core Category Section with navigation arrow takes you to another level of navigation items and opens up a page
        Given the side navbar is in the starting state
        When the user clicks on any part of a " Core Category Section with navigation arrow"
        Then they see that in the nav bar a "Core category item at the top of the navbar with an icon" shows up
        And the sub-category items are there under it
        And the home page opens up for the selected core category

    Scenario: Core Category Section with icon only
        Given the side navbar is in the starting state
        Then SaaSquatch Product News are displayed as the last menu item without an arrow
        When the user clicks on this item
        Then a home page for Product News opens up
        And there are no sub-categories for this item type

    Scenario: The navigation item with an arrow down opens a dropdown menu
        Given the user selected a core category
        When the user clicks on a "navigation item with an arrow down"
        Then the list of articles are shown under the item
        And there could be further dropdown items between the articles
        But the page is not changing

    Scenario: The navigation item with an arrow up closes a dropdown menu
        Given the user selected a "navigation item with an arrow down"
        When the user clicks on a "navigation item with an arrow up"
        Then they see the list of articles are closed
        And the arrow changes back to down

    Scenario: The article item in the menu opens up an article
        Given the user opened up a "navigation item with an arrow down"
        When the user clicks on the "article" item
        Then the article opens up in the central section of the page

    Scenario: The core category item at the top of the navbar with an icon stays there until you are at that area and used to navigate back to the home page of this category
        Given the user navigates within a core category
        Then they see that the "Core category item at the top of the navbar with an icon" item is visible all the time
        When they click on this item
        Then the side navbar closes
        And shows all the sub-categories under the core category closed
        And the home page opens up for this core category

    Scenario: The navbar items within a dropdown could be separated into further categories by a line and title
        Given the user opens up a "navigation item with an arrow down"
        Then they see articles separated by titles
        And a grey line ("example Developer Resources/API")
        And this separator item is not clickable

    Scenario: The breadcrumb at the top of the side navbar can be used to navigate back to the starting view of the side navbar and shows 3 levels of navigation
        Given the user is on the docs page
        Then the breadcrumb is at the top of the navbar under the search bar
        And shows the current location of the user in the navbar 3 levels deep
        And the order of items are "Menu/Core Category/Sub-category"

    Scenario: Special article menu items for API methods
        Given the user looks at the "Developer REsources/API" section
        When they open up a methods
        Then they see button like tags used to highlight method characteristics (example:"https://docs.saasquatch.com/api/methods#get_account")








