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

    @ui
    Scenario: CTA button visibility
        Given the following settings are filled up in contentful

            | CTA Settings    |
            | CTA Link        |
            | CTA Button Text |

        Then the user can see the CTA Button

    @motivating
    Scenario: If the button is visible it takes the user to a detailed content page set up in contentful
        Given a user clicks on the 'CTA button'
        Then they see a new page opening up with more content