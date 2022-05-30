@owner:derek
@author:lilla
Feature: Docs Home pages

    Display the home page items for Developer Center, Integrations and Success Center. Each home page has cards to navigate to specific pages.
    Each card has a Logo/Image, a Title, a Description and link.

    Background: A user arrives on the SaaSquatch help center page
        Given the user uses the side navigation bar
        And selects one of the following items:
            | Developer Center |
            | Integrations     |
            | Success Center   |

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
            | linkType |
            | card     |
            | ReadMore |

    @motivating
    Scenario Outline: List of available links from the home pages
        Given the user is on the <homePage> home page the user can see the <cards> card
        And they click on the card
        Then the card takes the them to the <links> page

        Examples:

            | homePage         | cards                        | links                                                       |
            | Success Center   | SaaSquatch Growth Automation | https://docs.saasquatch.com/growth/saasquatch-ga/           |
            | Success Center   | Program Library              | https://docs.saasquatch.com/program/library/                |
            | Success Center   | Program Setup Quickstart     | https://docs.saasquatch.com/growth/quickstart/              |
            | Success Center   | Referral Program Quickstart  | https://docs.saasquatch.com/guides/referral-quickstart/     |
            | Developer Center | Dev Guides                   | https://docs.saasquatch.com/guides/                         |
            | Developer Center | JSON Web Tokens              | https://docs.saasquatch.com/topics/json-web-tokens/         |
            | Developer Center | Testing Best Practices       | https://docs.saasquatch.com/developer/testing/              |
            | Developer Center | Squatch.js                   | https://docs.saasquatch.com/developer/squatchjs/            |
            | Developer Center | REST API                     | https://docs.saasquatch.com/api/                            |
            | Developer Center | GraphQL API                  | https://docs.saasquatch.com/graphql/reference/              |
            | Developer Center | Mobile                       | https://docs.saasquatch.com/mobile/                         |
            | Integrations     | Salesforce                   | https://docs.saasquatch.com/salesforce/                     |
            | Integrations     | SFTP Import                  | https://docs.saasquatch.com/sftp/                           |
            | Integrations     | Segment                      | https://docs.saasquatch.com/segment/                        |
            | Integrations     | TangoCard                    | https://docs.saasquatch.com/tangocard/                      |
            | Integrations     | Recurly                      | https://docs.saasquatch.com/recurly/                        |
            | Integrations     | AppsFlyer                    | https://docs.saasquatch.com/appsflyer-software-integration/ |
            | Integrations     | Branch Metrics               | https://docs.saasquatch.com/branch-metrics/                 |
            | Integrations     | Stripe                       | https://docs.saasquatch.com/stripe/                         |
            | Integrations     | Zapier                       | https://docs.saasquatch.com/zapier/                         |
            | Integrations     | Stitch                       | https://docs.saasquatch.com/stitch/                         |