@owner:lv
@author:am
Feature: Expand details

    Allows for collapsible section in the docs. For example the "Classic Only" section on this page: https://docs.saasquatch.com/success/gift-card-rewards/

    Scenario: "[+] Expand Details" buttons are only shown for specified sections

    Scenario: A section only has a single "[+] Expand Details" button

    Scenario: Shows collapsed by default

        Given this markup in a contentful article
            """
            <div class="js-docs-collapse" style="display:none;">
            <p>I am hidden by default</p>
            </div>
            """
        When the page is loaded
        Then that section is hidden
        And an "[+] Expand Details" button is shown
        When you click the button
        Then the section is shown
        When you click it again
        Then the section is hidden

    Scenario: Expanded/collapsed section state matches current button state

    Scenario: Expanded/collapsed state is lost when refreshing

    Scenario: Expanded/collapsed state is lost when navigating away from page

    Scenario: Clicking "[+] Expand Details" button expands relevant content section

    Scenario: Clicking "[+] Expand Details" button only expands one section

    Scenario: Clicking "[-] Collapse Details" collapses relevant content section

    Scenario: Clicking "[-] Collapse Details" only collapses one section
