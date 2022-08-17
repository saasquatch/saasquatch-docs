@owner:Keegan
@author:Keegan

Feature: Sitemap

    @motivating
    Scenario: Sitemaps are generated on the live site and on staging (note that they are a bit different)
        Given the user is on <url>
        Then the user will see a sitemap generated
        Examples:
            | url                                                                         |
            | https://docs.saasquatch.com/sitemap.xml                                     |
            | https://deploy-preview-181--saasquatch-docs.netlify.app/sitemap.staging.xml |

    @motivating
    Scenario: Sitemaps <loc> tags use absolute URL's with the base path being ________
        Given the user is on the Sitemap with basepath <path>
        And the user sees a url containing a loc <loc>
        Examples:
            | path                                                    | loc                                |
            | https://deploy-preview-181--saasquatch-docs.netlify.app | /about/                            |
            | https://docs.saasquatch.com                             | https://docs.saasquatch.com/about/ |

    @motivating
    Scenario: Sitemap <lastMod> tags are added (when?/when are they not there)
        Given the user is on the Sitemap
        And the user sees a url containing a loc <loc>
        Then the user may see a <lastmod> inside the url
        Examples:
            | loc          | lastmod    |
            | /about/      | none       |
            | /api/errors/ | 2020-07-06 |
    @minutia
    Scenario: Sitemap <lastMod> tags are in ____ format
        Given the user is on the Sitemap
        And the user sees a url with a lastmod tag
        Then the user sees the lastmod tag has a date in the format <format>
        Examples:
            | format     |
            | YYYY-MM-DD |