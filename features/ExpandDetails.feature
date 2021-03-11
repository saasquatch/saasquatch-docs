@owner:logan
@author:alex.mcmillan
Feature: Expand/collapse details

    Allows for collapsible section in the docs. For example the "Classic Only" section on this page: https://docs.saasquatch.com/success/gift-card-rewards/

    Scenario: "[+] Expand Details" buttons are only shown for specified sections
        Given this markup in a contentful article
            """
            <div class="js-docs-collapse" style="display:none;">
            <p>I am hidden by default</p>
            </div>
            """
        When the page is loaded
        Then an "[+] Expand Details" button is shown for the specified section
        And "[+] Expand Details" buttons are not shown for sections without this markup

    Scenario: A section only has a single "[+] Expand Details" button
        Given this markup in a contentful article
            """
            <div class="js-docs-collapse" style="display:none;">
            <p>I am hidden by default</p>
            </div>
            """
        When the page is loaded
        Then a single "[+] Expand Details" button is shown for the specified section
        And additional or duplicate "[+] Expand Details" buttons are not shown

    Scenario: Expanded/collapsed section state matches current button state
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
        And the "[+] Expand Details" button changes to a "[-] Collapse Details" button
        When you click "[-] Collapse Details"
        Then the section is hidden

    Scenario: Shows collapsed by default
        Given this markup in a contentful article
            """
            <div class="js-docs-collapse" style="display:none;">
            <p>I am hidden by default</p>
            </div>
            """
        When the page is loaded
        Then that section is hidden by default

    Scenario: Expanded/collapsed state is lost when refreshing
        Given valid markup for a hidden section exists in a contentful article
        And an "[+] Expand Details" button is clicked to show the hidden section
        When the current page is refreshed
        Then the section returns to the default state of hidden

    Scenario: Expanded/collapsed state is lost when navigating away from page
        Given valid markup for a hidden section exists in a contentful article
        And an "[+] Expand Details" button is clicked to show the hidden section
        When the current page is navigated away from and then returned to
        Then the section returns to the default state of hidden

    Scenario: Clicking "[+/-] Expand/Collapse Details" button expands/hides relevant content section
        Given valid markup for a hidden section exists in a contentful article
        When a "[+/-] Expand/Collapse Details" button is clicked to show/hide the relevant section
        Then only that section expands/hides
        And no other section expands/hides

    Scenario: Clicking "[+/-] Expand/Collapse Details" button only expands/hides one section
        Given valid markup for a hidden section exists in a contentful article
        When a "[+/-] Expand/Collapse Details" button is clicked to show/hide the relevant section
        Then only that section expands/hides
        And only the relevant section expands/hides
