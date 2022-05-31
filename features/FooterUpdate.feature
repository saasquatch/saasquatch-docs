@owner:derek
@author:lilla
Feature: Docs Footer Update

    New responsive design and links for the footer on the docs pages.

    Background: A user arrives on the SaaSquatch help center page
        Given the user stays on the 'https://docs.saasquatch.com/' pages
        Then the footer categories are visible


    @motivating
    Scenario: Categories and links for the footer
        Given the user looks at the footer
        Then the following categories and links are visible
        And the user can click on them
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


    @ui
    Scenario Outline: Breakpoints for the different screen sizes
        Given the user is looking at the footer from a <device> device
        Then the breakpoint width is <breakpoint>

        Examples:

            | device       | breakpoint |
            | mobile       | 363px      |
            | tablet       | 768px      |
            | small laptop | 1025px     |
            | large laptop | 1920px     |



Look-design

copywrite and address