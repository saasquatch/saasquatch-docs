@owner:derek
@author:lilla
Feature: Docs Home pages

    Display the home page items for Developer Center, Integrations and Success Center. Each home page has cards to navigate to specific pages.
    Each card has a Logo/Image, a Title, a Description and link.

    Background: A user arrives on the SaaSquatch help center page
        Given the user uses the side navigation bar
        And selects one of the following items:
        |Developer Center|
        |Integrations| 
        |Success Center|

    @motivating
    Scenario Outline: Cards and navigation items are shown on the page depending on the screen size
        Given the user is on a home page
        And the screen size is <screenSize>
        Then menu cards are visible in the center of the page in <numberOfColumns> columns
        And the navigation bar at the top is <topNavigationBarType>
        And the footer has <footerSections> sections
        And the side navigation bar is <sideNavigationType>

        Examples:

            | screenSize   | topNavigationBarType | footerSections | sideNavigationType | numberOfColumns |
            | small laptop | full                 | 1x4            | full               | 2               |
            | tablet       | 3 dots and filter    | 2x2            | sandwich           | 2               |
            | mobile       | 3 dots and filter    | 2x2            | sandwich           | 1               |

    @motivating
    Scenario Outline: Cards on the home pages are links to more content
        Given the user is on a home page
        And clicks on the <linkType>
        Then a new page opens up with specific content related to the link
        Examples:
        |linkType|
        |card|
        |ReadMore|

    @motivating
    Scenario Outline: List of available links from home pages
        Given the user is on the <homePage> home page the user can see <cards> cards
        And they click on the card
        Then the card takes the them to the <links>

        Examples:

        |homePage|cards|links
        |Success Center|
        |Success Center|
        |Success Center|
        |Success Center|
        |Developer Center|
        |Developer Center|
        |Developer Center|
        |Developer Center|
        |Developer Center|
        |Developer Center|
        |Developer Center|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|
        |Integrations|