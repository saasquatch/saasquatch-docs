@owner:derek
@author:lilla

Feature: Product News Page

    Product News Page shows a list of product news about SaaSquatch product updates, improvements, and new feature releases.

    @motivating
    Scenario Outline: Product news updates can be filtered by type
        Given a user selects from the type dropdown
        When they select <postType>
        Then they see a list of <postType>

        Examples:

            | postType         |
            | All Posts        |
            | Feature Releases |
            | Monthly Updates  |
            | Product Updates  |

    @motivating
    Scenario Outline: Product news updates can be filtered by date
        Given a user selects from the date dropdown
        When they select <date> dropdown item
        Then they see a list of items from <date>
        Examples:

            | date          |
            | From All-time |
            | Last 30 days  |
            | Past Year     |

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