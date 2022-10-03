@owner:Truman
@author:Truman
Feature: Table of Contents

    @motivating
    Scenario: Table of contents display links of headings from page
        Given a user is viewing an article in the docs
        Then they see a TOC on the right side of the page
        And the TOC has heading "In this Article:"
        And below the heading are a list of links from the article

    @motivating
    Scenario Outline: Clicking on an item in TOC scrolls to linked heading in page
        Given a user is viewing a docs article with TOC
        When they click on a <type> TOC link
        Then the page scrolls to the corresponding section heading
        And the TOC is still visible on the right side of the page
        Examples:
            | type      |
            | top level |
            | nested    |

    @ui
    @minutia
    Scenario: Table of content items display hover state on hover
        Given a user is viewing a docs article with TOC
        When they hover over a link in TOC
        Then the item's text is in bold
        And the item's left border is green "#007A5B"

    @motivating
    Scenario: Introduction section appears on top of TOC
        Given a user is viewing a docs article with TOC
        Then the first link in the TOC is "Introduction"
        When they click on "Introduction"
        Then the page scrolls to the page heading

    @motivating
    Scenario Outline: Table of contents support nested headings
        Given a user is viewing a docs article with TOC
        And the page's content has nested headings
        Then the TOC has nested links
        When they hover over a nested link
        Then only the nested link is in the hover state
        When they click the nested link
        Then the page scrolls to the corresponding sub-section

    @motivating
    Scenario Outline: Table of contents handles nesting correctly
        Given a user is viewing a docs article with TOC
        And the page's content has <headings>
        Then the TOC has <nesting>
        Examples:
            | headings               | nesting                                            |
            | h1, h2, h3, h4, h5, h6 | every heading is nested under the previous heading |
            | h3, h3, h3, h2, h2     | every heading is on the first level                |
            | h2, h4, h5, h4         | h4 headings are nested on the same level           |
            | h2, h3, h6, h4         | h4 is nested on the same level as h6               |
            | h2, h3, h6, h4, h2, h1 | h1 and h2 are on the first level                   |


    @ui
    Scenario: Table of content scrolls when overflowing from view
        Given a user is viewing a docs article with TOC
        And the TOC is overflowing from view
        Then they are able to scroll the TOC to access hidden links

    @landmine
    Scenario: Clicking on a link in TOC changes spacing in navigation bar
        This is existing bug and we were unable to fix during the TOC upgrade project
        Given a user is viewing a docs article with TOC
        When they click a link from the TOC
        Then the top navigation bar lacks spacing
        And there is white space at the bottom of the page
        When they refresh the page
        Then the top nagivation bar returns to normal
