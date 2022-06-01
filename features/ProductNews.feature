@owner:derek
@author:lilla

Feature: Product News Page Update

    Display the Product News Page with cards to navigate to news.


    Scenario: There are two filter options at the top of the news column to filter based on tags and dates
    Given a user wants to filter the news feed
    Then they can select from the following dropdown filter items for type

    |postType|
    |All Posts|
    |Feature Releases|
    |Monthly Updates|
    |Product Updates|

    And they can select from the following dropdown items for dates

    |dates|
    |From All-time|
    |Last 30 days|
    |Past Year|

    Scenario: News cards are showing on the page in one column regardless of the screen size
        Given a user looks at the card
        Then they see the following items

            | cardParts |
            | Title     |
            | Date      |
            | Tags      |
            | Content   |

        And they see a 'CTA button' if the following settings are included in the contentful editor

            | CTA Settings    |
            | CTA Link        |
            | CTA Button Text |

    Scenario: When the button is visible it takes the user to a detailed content page set up in contentful
        Given a user clicks on the 'CTA button'
        Then they see a new page opening up with more content
