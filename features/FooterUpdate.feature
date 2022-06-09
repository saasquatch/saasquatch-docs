@owner:derek
@author:lilla
Feature: Docs Footer

    New responsive design and links for the footer on the docs pages.


    @motivating
    Scenario: The footer displays resources with distinct links grouped into 4 different categories
        Given a user viewing the footer
        Then they see the following categories and links

            | Category  | Sub-category      | Link                                                                          |
            | Product   | Login             | https://app.referralsaasquatch.com                                            |
            | Product   | Customer Loyalty  | https://www.saasquatch.com/loyalty-program-software/                          |
            | Product   | Customer Referral | https://www.saasquatch.com/referral-program-software/                         |
            | Product   | Request Demo      | https://www.saasquatch.com/request-demo/                                      |
            | Product   | Integrations      | https://www.saasquatch.com/api-integrations/                                  |
            | Product   | Status Page       | https://status.saasquatch.com/                                                |
            | Company   | About             | https://www.saasquatch.com/about/                                             |
            | Company   | Partner Program   | https://www.saasquatch.com/partners/                                          |
            | Company   | Careers           | https://www.saasquatch.com/careers/                                           |
            | Company   | Contact Us        | https://www.saasquatch.com/contact/                                           |
            | Resources | Blog              | https://www.saasquatch.com/blog/                                              |
            | Resources | Podcast           | https://www.saasquatch.com/the-advocacy-channel-a-customer-marketing-podcast/ |
            | Resources | Case Studies      | https://www.saasquatch.com/customers/                                         |
            | Resources | Loyalty Academy   | https://www.digitalloyaltyacademy.com/                                        |
            | Legal     | Terms of Service  | https://www.saasquatch.com/terms-of-service/                                  |
            | Legal     | Privacy Policy    | https://www.saasquatch.com/privacy-policy/                                    |
            | Legal     | Terms of Use      | https://www.saasquatch.com/terms-of-use/                                      |

        When they click on a sub-category
        Then the link is opening up

    @motivating
    Scenario: At the bottom of the footer there is copywrite and address information
        Given a user viewing the bottom of the footer
        Then they see the following information
            | Company information                                       |
            | Copyright © 2022 SaaSquatch.com. All rights reserved.     |
            | 1017 Fort St, Victoria, British Columbia, V8V 3K5, Canada |


    @ui
    Scenario Outline: The footer displays a variable amount of columns based on screen size
        Given a user viewing the footer from a <device> device
        Then the breakpoint width is <breakpoint>
        When they change to a different screen size
        Then they experience responsive design changes
        And they see <footerColumn> columns in the footer

        Examples:

            | device       | breakpoint | footerColumn |
            | mobile       | 363px      | 2            |
            | tablet       | 768px      | 2            |
            | small laptop | 1025px     | 4            |
            | large laptop | 1920px     | 4            |

    @ui
    Scenario: Visual design of the footer categories and sub-categories
        Given a user viewing the footer
        Then they see that the <category> font type is <fontType>
        And the <category> font case is <case>
        And there is <line> line under the text

            | category     | fontType | case       | line |
            | Header       | bold     | upper case | no   |
            | Sub-category | normal   | title case | one  |
