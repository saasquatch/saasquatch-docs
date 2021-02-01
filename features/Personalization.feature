@owner:lv
@author:am
Feature: Personalization

	- Personalization works (API sidebar, api reference)
	- Personalization toggle works

	Scenario: Personalization menu is shown
		Given I am on the SaaSquatch docs page at any location
		Then a personalization menu is shown at the top of the main content section

	Scenario: Personalization menu default state
		Given I load the SaaSquatch docs page at any location for the first time
		And a personalization menu is shown at the top of the main content section
		Then the default option of "Docs are being personalised for new programs" is selected

	Scenario: Personalization menu filter state can be changed
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option>

	Scenario: Personalization cookie is not dropped on first load
		Given I load the SaaSquatch docs page at any location for the first time
		Then the personalization cookie containing personalization menu settings is not created

	Scenario: Personalization cookie is updated on first filter selection
		Given I load the SaaSquatch docs page at any location for the first time
		Then a cookie containing personalization menu settings is not created
		When I choose a personalization menu option for the first time
		Then the personalization cookie containing "docs-version" values is created

	Scenario: Personalization cookie can be updated
		Given I load the SaaSquatch docs page at any location
		When I select <filter option>

		Examples:
			| filter option                                    | cookie value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

		Then the personalization cookie is updated with a corresponding <cookie value> that match <filter option>

	Scenario: Personalization menu icon displayed
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		Then an icon that matches the currently seleted filter option is visible

	Scenario: Personalization menu icons match
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the icon displayed is updated abd matches <filter option>

	Scenario: Personalization menu active icon is updated
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the icon in the personalization menu that matches <filter option> is not grey and is displayed in colour

	Scenario: Personalization menu state is maintained when navigating
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option>
		When I navigate to different pages on the docs page
		Then the selected <filter option> remains

	Scenario: Personalization menu state is maintaned when refreshing
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option>
		When I refresh the docs page
		Then the selected <filter option> remains

	Scenario: Personalization menu state is lost when cookies are cleared
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option>
		When I clear my browser cookies
		Then the personalization menu reverts to the default state

	Scenario: Personalization menu only one filter can be selected
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option>
		When I attempt to select a second filter term
		Then the personalization menu only allows a single filter term to be selected

	Scenario: Personalization menu seleted filter is shown
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the new <filter option> and the options are hidden
		When I click the personalization menu again
		Then the selected <filter option> is updated
