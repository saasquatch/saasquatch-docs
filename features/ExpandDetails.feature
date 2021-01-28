Feature: Expand details

    Allows for collapsible section in the docs. For example the "Classic Only" section on this page: https://docs.saasquatch.com/success/gift-card-rewards/

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

