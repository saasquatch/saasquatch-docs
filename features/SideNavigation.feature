Feature: Navigating Sidenav
    This allows users to easily navigate and select between articles/documents within our help center site.
    @ui
    Scenario: Menu Item display a hovered state when hovered
        Given a user viewing the Side nav
        When they hover a menu item
        Then the background color of the menu item changes to a muted green (E7EDEE)
    @ui
    Scenario: Core Category Section Item display a selected state when selected
        Given a user viewing the Side nav
        When they select a 'Core Category Section' item
        Then the background color of the menu item changes to a dark green (003B45)
        And the text color changes to white (FFFFFF)
        And icon color changes to white (FFFFFF)
        And they see the corresponding content page opening up

    @ui
    Scenario: Core Category Section with navigation arrow takes the user to a new page
        Given a user viewing the Side nav
        When they select a 'Core Category Section with navigation arrow' item
        Then they navigate to a corresponding side bar
        And they see the corresponding page content opening up


    @ui
    Scenario: 'Parent with dropdown arrow' menu item is expanded
        Given a user viewing the Side nav
        When they select a 'Parent with dropdown arrow' menu item
        Then they see the text of the 'Parent with dropdown arrow'  menu item will be bolded
        And they see that the arrow will point up

    @ui
    Scenario: Parent menu item is selected
        Given a user viewing the Side nav
        When they select a Parent menu item
        Then the background color of the menu item changes to a dark green (003B45)
        And the text color changes to white (FFFFFF)
        And they see the corresponding content page opening up
