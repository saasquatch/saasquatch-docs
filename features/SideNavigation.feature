@owner:lilla
@author:lilla

Feature: Navigation Sidenav

    Navigation sidebar allows users to easily navigate and select between articles and categories within our help center site

    @ui
    Scenario Outline:
        Given user arrives on the SaaSquatch help center page
        Then they see the <maincategory> main category item with <icon> icon in the side navbar
        And the <maincategory> menu item leads to <homepage> home page
        Examples:
            | maincategory            | icon              | homepage             |
            | SaaSquatch Product News | megaphone         | /product-news        |
            | Learning SaaSquatch     | graduation cap    | /learning-saasquatch |
            | Building Programs       | hammer            | /building-programs   |
            | Running Programs        | arrow trend up    | /running-programs    |
            | Integrations            | 3 cubes in a pile | /integrations        |
            | Developer Resources     | </> sign          | /developer           |

    @ui
    @motivating
    Scenario Outline: Navigation bar item has a default state when no action is happening.
        Given a user looks at the <menuItem> menu item in the side navigation bar
        Then they see that the background color is FFFFFF
        And text color is 003B45-dark green
        And text type is normal
        And the icon color is 003B45-dark green
        And the dropdown line is <dropdownLine>
        And the arrow points <arrowDirection>

        Examples:

            | menuItem                                    | dropdownLine      | arrowDirection |
            | Core Category Section                       | FFFFFF            | N/A            |
            | Core Category Section with navigation arrow | FFFFFF            | to the right   |
            | Parent                                      | FFFFFF            | N/A            |
            | Parent with dropdown arrow                  | FFFFFF            | down           |
            | Child                                       | 003B45-dark green | N/A            |
            | Child with dropdown arrow                   | 003B45-dark green | down           |

    @ui
    @motivating
    Scenario Outline: Navigation bar item has a hovered over state.
        Given a user hovers over the <menuItem> menu item in the side navigation bar
        Then they see that the background color is E7EDEE-muted green
        And text color is 003B45-dark green
        And text type is normal
        And the icon color is 003B45-dark green
        And the dropdown line is <dropdownLine>
        And the arrow points <arrowDirection>

        Examples:

            | menuItem                                    | <dropdownLine>    | <arrowDirection> |
            | Core Category Section                       | FFFFFF            | N/A              |
            | Core Category Section with navigation arrow | FFFFFF            | to the right     |
            | Parent                                      | FFFFFF            | N/A              |
            | Parent with dropdown arrow                  | FFFFFF            | down             |
            | Child                                       | 003B45-dark green | N/A              |
            | Child with dropdown arrow                   | 003B45-dark green | down             |

    @ui
    @motivating
    Scenario Outline: Navigation bar item has a selected state when the user clicks on the menu item.
        Given a user selects the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>
        When the user clicks the Menu link in the breadcrumb
        Then they get back to the starting view of the navigation bar

        Examples:

            | <menuItem>                                  | <backgroundColor> | <textColor>       | <textType> | <iconColor> | <dropdownLine>                                      | <arrowDirection> | <action>                              |
            | Core Category Section                       | 003B45-dark green | FFFFFF            | bold       | FFFFFF      | 003B45-dark green                                   | N/A              | corresponding content page opening up |
            | Core Category Section with navigation arrow | N/A               | N/A               | N/A        | N/A         | 003B45-dark green                                   | arrow point up   | N/A                                   |
            | Parent                                      | 003B45-dark green | FFFFFF            | N/A        | N/A         | 003B45-dark green                                   | N/A              | corresponding content page opening up |
            | Parent with dropdown arrow                  | FFFFFF            | 003B45-dark green | bold       | N/A         | 003B45-dark green                                   | arrow point up   | N/A                                   |
            | Child                                       | 003B45-dark green | FFFFFF            | bold       | N/A         | dropdown line changes to 2px width and green-06966F | N/A              | corresponding content page opening up |
            | Child with dropdown arrow                   | FFFFFF            | 003B45-dark green | bold       | N/A         | 003B45-dark green                                   | arrow point up   | N/A                                   |

    @ui
    Scenario: When a page is not found a custom 404 error page is displayed
        Given the user clicks on a link which is not available
        Then they see a 404 Page Not Found message
        And they see a custom design with Squatchy sitting in the middle of the 0
        And a message

    @ui
    Scenario: The logo at the top of the side navbar takes you to the "https://docs.saasquatch.com/" page.
        Given the user is on any page of the docs portal
        When they click the SaaSquatch logo at the top of the navigation bar
        Then the navigation bar has every dropdown closed
        And shows the 6 main menu items
        And the central section of the page shows the "help center" search page
        And the url is "https://docs.saasquatch.com/"

    @motivating
    Scenario: There is a search box at the top of the side navbar (more specs available in a separate file for Search).
        Given the user is on the SaaSquatch docs page at any location
        Then a search input field is shown in the sidebar
        And the default state for the search input field is empty
        And the search is working expected

    @ui
    Scenario: The Core Category Section with navigation arrow takes you to another level of navigation items and opens up a home page.
        Given the side navbar is in the starting state
        When the user clicks on any part of a " Core Category Section with navigation arrow"
        Then they see that in the nav bar a "Core category item at the top of the navbar with an icon" shows up
        And it's in a selected state
        And the sub-category items are there under it
        And the user being redirected to the selected home page
        When the user clicks on an article still under the selected main category
        Then the "Core category item at the top of the navbar with an icon" changes it state to not selected
        And the user is being redirected to the article's page

    @ui
    Scenario: There is a Core Category Section with icon only which doesn't have any sub-categories.
        Given the side navbar is in the starting state
        Then SaaSquatch Product News is displayed as the first menu item without an arrow
        When the user clicks on this item
        Then the user being redirected to /product-news
        And there are no sub-categories for this item type

    @ui
    Scenario: Sidebar drop down elements display sub articles when clicked
        Given the user selected a core category
        When the user clicks on a "navigation item with an arrow down"
        Then the list of articles are shown under the item
        And there could be further dropdown items between the articles
        But the page is not changing

    @ui
    Scenario: The navigation item with an arrow up closes a dropdown menu
        Given the user selected a "navigation item with an arrow down"
        When the user clicks on a "navigation item with an arrow up"
        Then they see the list of articles are closed
        And the arrow changes back to down

    @motivating
    Scenario: The article item in the menu opens up an article
        Given the user opened up a "navigation item with an arrow down"
        When the user clicks on the "article" item
        Then the user is being redirected to the article's url
        And the article opens up in the central section of the page

    @ui
    Scenario: The navbar items within a dropdown could be separated into further categories by a line and title
        Given the user opens up a "navigation item with an arrow down"
        Then they see the articles separated by a grey line with grey text "example Developer Resources/API"
        And this separator item is not clickable

    @motivating
    Scenario: Breadcrumbs are displayed at the top of the sidebar can be used to navigate
        Given the user is on the docs page: https://docs.saasquatch.com/
        Then the breadcrumb is at the top of the navbar under the search bar
        And shows the current location of the user in the navbar 2 levels deep
        And the order of items are "Menu/Core Category"
        When they click on the "Menu", first level of the breadcrumb
        Then they see the menu changing back to the 6 main categories
        And the second layer of the breadcrumb is not a link, just showing the current sub-category item

    @minutia
    Scenario Outline: Special article menu items for API methods
        Given the user looks at the "Developer Resources/API" section
        When they open up a method category under REST API REFERENCE section example: Account
        Then they see a that every method has an Overview section
        And method/s listed
        And they see badge ui elements to tag <types> method type
        And they see badge ui elements to mark "Open Endpoints"

    @ui
    Scenario: The logo at the top of the side navbar takes you to the "https://docs.saasquatch.com/" page.
        Given the user is on any page of the docs portal
        When they click the SaaSquatch logo at the top of the navigation bar
        Then the navigation bar has every dropdown closed
        And shows the 6 main menu items
        And the central section of the page shows the "help center" search page
        And the url is "https://docs.saasquatch.com/"

    @motivating
    Scenario: There is a search box at the top of the side navbar (more specs available in a separate file for Search).
        Given the user is on the SaaSquatch docs page at any location
        Then a search input field is shown in the sidebar
        And the default state for the search input field is empty
        And the search is working expected

    @ui
    Scenario: The Core Category Section with navigation arrow takes you to another level of navigation items and opens up a home page.
        Given the side navbar is in the starting state
        When the user clicks on any part of a " Core Category Section with navigation arrow"
        Then they see that in the nav bar a "Core category item at the top of the navbar with an icon" shows up
        And it's in a selected state
        And the sub-category items are there under it
        And the user being redirected to the selected home page
        When the user clicks on an article still under the selected main category
        Then the "Core category item at the top of the navbar with an icon" changes it state to not selected
        And the user is being redirected to the article's page

    @ui
    Scenario: There is a Core Category Section with icon only which doesn't have any sub-categories.
        Given the side navbar is in the starting state
        Then SaaSquatch Product News is displayed as the first menu item without an arrow
        When the user clicks on this item
        Then the user being redirected to /product-news
        And there are no sub-categories for this item type

    @ui
    Scenario: Sidebar drop down elements display sub articles when clicked
        Given the user selected a core category
        When the user clicks on a "navigation item with an arrow down"
        Then the list of articles are shown under the item
        And there could be further dropdown items between the articles
        But the page is not changing

    @ui
    Scenario: The navigation item with an arrow up closes a dropdown menu
        Given the user selected a "navigation item with an arrow down"
        When the user clicks on a "navigation item with an arrow up"
        Then they see the list of articles are closed
        And the arrow changes back to down

    @motivating
    Scenario: The article item in the menu opens up an article
        Given the user opened up a "navigation item with an arrow down"
        When the user clicks on the "article" item
        Then the user is being redirected to the article's url
        And the article opens up in the central section of the page

    @ui
    Scenario: The navbar items within a dropdown could be separated into further categories by a line and title
        Given the user opens up a "navigation item with an arrow down"
        Then they see the articles separated by a grey line with grey text "example Developer Resources/API"
        And this separator item is not clickable

    @motivating
    Scenario: Breadcrumbs are displayed at the top of the sidebar can be used to navigate
        Given the user is on the docs page: https://docs.saasquatch.com/
        Then the breadcrumb is at the top of the navbar under the search bar
        And shows the current location of the user in the navbar 2 levels deep
        And the order of items are "Menu/Core Category"
        When they click on the "Menu", first level of the breadcrumb
        Then they see the menu changing back to the 6 main categories
        And the second layer of the breadcrumb is not a link, just showing the current sub-category item

    @minutia
    Scenario Outline: Special article menu items for API methods
        Given the user looks at the "Developer Resources/API" section
        When they open up a method category under REST API REFERENCE section example: Account
        Then they see a that every method has an Overview section
        And method/s listed
        And they see badge ui elements to tag <types> method type
        And they see badge ui elements to mark "Open Endpoints"
        When a user clicks on a method
        Then they got redirected to a section of the api/methods document
        And the url changes to api/methods#menthod_name

        Examples:
            | types  |
            | GET    |
            | POST   |
            | DELETE |
            | PUT    |

    @motivating
    Scenario: Selecting an article from a search opens up the navbar at the location of the article
        Given the user searching for an article in the search bar
        When they click on an article from the list
        Then they see the navigation bar opens up at the correct navigation bar main category
        And sub-category where the article is located in the navigation bar tree

    @motivating
    Scenario: Clicking a link in an article opens up the navbar at the location of the link
        Given the user clicks on a link which takes them to another article
        Then they see the navigation bar opens up at the correct navigation bar main category
        And sub-category where the article is located in the navigation bar tree

    @motivating
    Scenario: A home page card takes you to the first article of the sub-category
        Given the user clicks on a home page card
        Then they see the navigation bar opens up at the correct navigation bar sub-category
        And the first article in the list is selected
        And they user being redirected to the article










