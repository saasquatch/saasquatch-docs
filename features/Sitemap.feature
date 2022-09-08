@owner:Keegan
@author:Keegan
Feature: Sitemap

    @motivating
    Scenario: Sitemaps are generated on the live site and on staging
        Given a user is on the <version> docs site
        When they navigate to <url>
        Then they see the <version> site map
        Examples:
            | version    | url                                                                                    |
            | production | https://docs.saasquatch.com/sitemap.xml                                                |
            | staging    | https://deploy-preview-{deployNumber}--saasquatch-docs.netlify.app/sitemap.staging.xml |

    @motivating
    Scenario: The sitemap is generated with <loc> tags
        Given the <version> docs site sitemap
        And the base path for the sitemap is <basePath>
        Then the loc tags are in format <loc>
        Examples:
            | version    | basePath                    | loc                                     |
            | staging    | /                           | /{pagePath}                             |
            | production | https://docs.saasquatch.com | https://docs.saasquatch.com/{pagePath}/ |

    @motivating
    Scenario: Sitemap <lastMod> tags are added when a page has a date last modified
        Given the docs site map
        And a page <mayHave> a last modified date
        Then the sitemap entry <mayHave> a lastmod tag with the date formated in YYYY-MM-DD
        Examples:
            | mayHave      |
            | has          |
            | doesn't have |

    @minutia
    Scenario Outline: Not all pages get <lastMod> tags
        Given the docs site map
        Then the <page> does not have a lastMod tag
        Examples:
            | page                         |
            | /about/                      |
            | /developer/purchase-object/  |
            | /graphql/custom-widget/      |
            | /graphql/reference/          |
            | /                            |
            | /mobile/appsflyer/reference/ |
            | /search/                     |
            | /api/methods/                |
            | /product-news/               |
            | /success/                    |
            | /developer/                  |
            | /breaking-changes/           |
            | /program/library/            |
            | /developer/squatchjs/issue/  |
            | /themes/fields/              |
            | /integrations/               |
            | /guides/                     |
            | /learning-saasquatch/        |
            | /building-programs/          |
            | /running-programs/           |
