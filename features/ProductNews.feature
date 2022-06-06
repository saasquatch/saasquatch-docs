@owner:derek
@author:lilla

Feature: Product News Page

    Display the Product News Page with cards to navigate to news.

    @motivating
    Scenario: Product news updates can be filtered by type
        Given a user selects from the type dropdown
        Then they can see the following items

            | postType         |
            | All Posts        |
            | Feature Releases |
            | Monthly Updates  |
            | Product Updates  |

    @motivating
    Scenario: Product news updates can be filtered by date
        Given a user selects from the date dropdown
        Then they can see the following items

            | date          |
            | From All-time |
            | Last 30 days  |
            | Past Year     |

    @motivating
    Scenario: News cards are showing on the page in one column regardless of the screen size
        Given a user looks at the card
        Then they see the following items

            | cardParts |
            | Title     |
            | Date      |
            | Tags      |
            | Content   |

    @motivating
    Scenario Outline: More product news update available with the right things configured
        Given the link is <linkStatus> in Contentful
        And the button text is <buttonTextStatus> in Contentful
        Then the CTA button is <buttonVisibility>
        When the user clicks on the 'CTA button' if visible
        Then they see a new page opening up with more content

        Examples:

            | linkStatus     | buttonTextStatus | buttonVisibility |
            | configured     | configured       | visible          |
            | not configured | not configured   | not visible      |
            | configured     | not configured   | not visible      |
            | not configured | configured       | not visible      |