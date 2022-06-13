Feature: Navigating Sidenav
    This allows users to easily navigate and select between articles/documents within our help center site
    @ui
    @motivating
    Scenario Outline: Default menu item state in the side navigation bar
        Given a user looks at the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>
        And the arrow points <arrowDirection>

        Examples:

            | <menuItem>                                  | <backgroundColor> | <textColor>         | <textType> | <iconColor>         | <dropdownLine>      | <arrowDirection> |
            | Core Category Section                       | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Core Category Section with navigation arrow | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | to the right     |
            | Parent                                      | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Parent with dropdown arrow                  | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | down             |
            | Child                                       | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | N/A              |
            | Child with dropdown arrow                   | FFFFFF            | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | down             |

    @ui
    @motivating
    Scenario Outline: Hovered menu item state in the side navigation bar
        Given a user hovers over the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>

        Examples:

            | <menuItem>                                  | <backgroundColor>    | <textColor>         | <textType> | <iconColor>         | <dropdownLine>      | <arrowDirection> |
            | Core Category Section                       | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Core Category Section with navigation arrow | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | to the right     |
            | Parent                                      | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | N/A              |
            | Parent with dropdown arrow                  | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | FFFFFF              | down             |
            | Child                                       | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | N/A              |
            | Child with dropdown arrow                   | E7EDEE (muted green) | 003B45 (dark green) | normal     | 003B45 (dark green) | 003B45 (dark green) | down             |

    @ui
    @motivating
    Scenario Outline: Selected menu item state in the side navigation bar
        Given a user selects the <menuItem> menu item in the side navigation bar
        Then they see that the background color is <backgroundColor>
        And text color is <textColor>
        And text type is  <textType>
        And the icon color is <iconColor>
        And the dropdown line is <dropdownLine>

        Examples:

            | <menuItem>                                  | <backgroundColor>   | <textColor>         | <textType> | <iconColor> | <dropdownLine>                                        | <arrowDirection> | <action>                              |
            | Core Category Section                       | 003B45 (dark green) | FFFFFF              | bold       | FFFFFF      | 003B45 (dark green)                                   | N/A              | corresponding content page opening up |
            | Core Category Section with navigation arrow | N/A                 | N/A                 | N/A        | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |
            | Parent                                      | 003B45 (dark green) | FFFFFF              | N/A        | N/A         | 003B45 (dark green)                                   | N/A              | corresponding content page opening up |
            | Parent with dropdown arrow                  | FFFFFF              | 003B45 (dark green) | bold       | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |
            | Child                                       | 003B45 (dark green) | FFFFFF              | bold       | N/A         | dropdown line changes to 2px width and green (06966F) | N/A              | corresponding content page opening up |
            | Child with dropdown arrow                   | FFFFFF              | 003B45 (dark green) | bold       | N/A         | 003B45 (dark green)                                   | arrow point up   | N/A                                   |
