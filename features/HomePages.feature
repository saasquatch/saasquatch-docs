@owner:derek
@author:lilla
Feature: Docs Home pages

    There are 5 home pages for the docs site, accessible from the sidenavbar. Each home page has cards to navigate to specific pages.
    Each card has a Title, a Description and works as a button link.

    Background: A user arrives on the SaaSquatch help center page
        Given the user looks at the side navigation bar
        Then they see the following main category items
            | Learning SaaSquatch     |
            | Building Programs       |
            | Running Programs        |
            | Integrations            |
            | Developer Resources     |
            | SaaSquatch Product News |
        And these items are leading to home pages
        But the "SaaSquatch Product News" does not have a home page, it's a list of news items

    @ui
    Scenario: Home pages are designed to display the available main areas from the page
        Given the user arrives on a home page
        Then they see a header
        And a description of the page
        And they see cards

    @ui
    Scenario Outline: The number of cards diplayed in a row depends on the screen size
        Given the user looks at a home page from a <screensize>
        Then they see <numberOfCardsinaRow> cards in a row
        Examples:
            | screensize   | numberOfCardsinaRow |
            | Desktop      | 2                   |
            | Small laptop | 2                   |
            | Tablet       | 2                   |
            | Mobile       | 1                   |

    @ui
    Scenario: Cards are designed to highlight the main information about the category
        Given the user looks at a card on a home page
        Then they see a title in bold
        And a description in normal font type
        And the whole card is a button to navigate to the page
        And the card has a grey shadow

         @motivating
    Scenario: Integration homepage cards are special cards with a logo
    Given the user looks at a card on the "Integrations" home page
        Then they see the logo of the company we are integrating with
        And they see a title in bold
        And a description in normal font type
        And the whole card is a button to navigate to the page
        And the card has a grey shadow

    @ui
    Scenario: The cards background shadow is changing on hover over
        Given the user looks at a card on a home page
        When they hover over the cards
        Then the border turns slightly green #B5CDC7
        And the drop shadow turns a slight green #007A5B 10% opacity

    @motivating
    Scenario: The cards are used to navigate further
        Given the user is on a home page
        And clicks on a card
        Then a new page opens up with specific content related to the card
