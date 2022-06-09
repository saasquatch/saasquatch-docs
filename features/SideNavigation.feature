Feature: Navigating Sidenav
    This allows users to easily navigate and select between articles/documents within our help center site

    @ui
    @motivating
    Scenario Outline: Menu item behavior in the side navigation bar
        Given a user performs a <trigger> on a <menuItem>
        Then they see that the background color changes to <backgroundColor>
        And text color changes to <textColor>
        And text type changes to <textType>
        And the icon color changes to <iconColor>
        And they see <action1> and <action2> happening
        Examples:

            | <menuItem>                                  | <trigger> | <backgroundColor>    | <textColor>         | <textType> | <iconColor>         | <action1>                                             | <action2>                             |
            | all                                         | hover     | E7EDEE (muted green) | N/A                 | N/A        | N/A                 | N/A                                                   | N/A                                   |
            | all                                         | N/A       | FFFFFF               | 003B45 (dark green) | normal     | 003B45 (dark green) | N/A                                                   | N/A                                   |
            | Core Category Section                       | selected  | 003B45 (dark green)  | FFFFFF              | N/A        | FFFFFF              | corresponding content page opening up                 | N/A                                   |
            | Core Category Section with navigation arrow | selected  | N/A                  | N/A                 | N/A        | N/A                 | navigate to a corresponding side bar                  | corresponding content page opening up |
            | Parent with dropdown arrow                  | selected  | N/A                  | N/A                 | bold       | N/A                 | arrow point up                                        | N/A                                   |
            | Parent menu item                            | selected  | 003B45 (dark green)  | FFFFFF              | N/A        | N/A                 | corresponding content page opening up                 | N/A                                   |
            | Child with dropdown arrow                   | selected  | N/A                  | N/A                 | bold       | N/A                 | arrow point up                                        | N/A                                   |
            | Child menu item                             | selected  | 003B45 (dark green)  | FFFFFF              | bold       | N/A                 | dropdown line changes to 2px width and green (06966F) | corresponding content page opening up |

