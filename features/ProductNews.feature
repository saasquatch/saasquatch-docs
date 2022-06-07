@owner:derek
@author:lilla

Feature: Product News Page

    Display the Product News Page with cards to navigate to news.

    @motivating
    Scenario Outline: Product news updates can be filtered by type
        Given a user selects from the type dropdown
        When they select <postType>
        Then they see a list of <filteredNews>
        Examples:

            | postType         | filteredNews     |
            | All Posts        | all news         |
            | Feature Releases | feature releases |
            | Monthly Updates  | monthly updates  |
            | Product Updates  | product updates  |

    @motivating
    Scenario: Product news updates can be filtered by date
        Given a user selects from the date dropdown
        When they select <date>
        Then they see a list of items from <dateFilteredNews>
        Examples:

            | date          | dateFilteredNews |
            | From All-time | all time         |
            | Last 30 days  | last 30 days     |
            | Past Year     | past year        |

    @motivating
    Scenario: News cards are showing on the page in one column regardless of the screen size
        Given a user looks at the card
        Then they see the following items
        And the layout stays the same for <screensize> screen sizes
        Examples:

            | cardParts | screensize |
            | Title     | all        |
            | Date      | all        |
            | Tags      | all        |
            | Content   | all        |

    @motivating
    Scenario Outline: A button is visible to take the user to more detailed news in each card when it's configured in contentful
        Given the link is <linkStatus> in Contentful
        And the button text is <buttonTextStatus> in Contentful
        Then the CTA button is <buttonVisibility>
        And the configured button text in contentful is used as the button text on the product news card
        When the user clicks on the 'CTA button' if visible
        Then they are redirected the cta link in a new tab

        Examples:

            | linkStatus     | buttonTextStatus | buttonVisibility |
            | configured     | configured       | visible          |
            | not configured | not configured   | not visible      |
            | configured     | not configured   | not visible      |
            | not configured | configured       | not visible      |