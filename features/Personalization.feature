@owner:logan
@author:alex.mcmillan
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

	Scenario Outline: Personalization menu filter state can be changed
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the selected <filter option>
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario: Personalization menu icon displayed
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		Then an icon that matches the currently selected filter option is visible

	Scenario Outline: Personalization menu icons match
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the icon displayed is updated and matches <filter option>
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Personalization menu active icon is updated
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the icon in the personalization menu that matches <filter option> displayed in colour and not grey
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Personalization menu state is maintained when navigating
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the selected <filter option>
		When I navigate to different pages of the docs
		Then the selected <filter option> remains
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Personalization menu state is maintained when refreshing
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the selected <filter option>
		When I refresh the docs page
		Then the selected <filter option> remains
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Personalization menu only one filter can be selected
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the new <filter option>
		When I attempt to select a second filter term
		Then the personalization menu only allows a single filter term to be selected
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Personalization menu selected filter is shown
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the new <filter option> and the options are hidden
		When I click the personalization menu again
		Then the selected <filter option> is updated
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario: Personalization cookie is not dropped on first load
		Given I load the SaaSquatch docs page at any location for the first time
		Then the personalization cookie containing personalization menu settings is not created

	Scenario: Personalization cookie is updated on first filter selection
		Given I load the SaaSquatch docs page at any location for the first time
		Then a cookie containing personalization menu settings is not created
		When I choose a personalization menu option for the first time
		Then the personalization cookie containing "docs-version" values is created

	Scenario Outline: Personalization cookie is updated
		Given I load the SaaSquatch docs page at any location
		When I select <filter option>
		Then the personalization cookie is updated with a corresponding <cookie value> that matches <filter option>
		Examples:
			| filter option                                    | cookie value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

	Scenario Outline: Personalization menu state is lost when cookies are cleared
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>
		Then the personalization menu is updated with the new <filter option>
		When I clear my browser cookies
		Then the personalization menu reverts to the default state
		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

	Scenario Outline: Rest API Reference methods are shown/hidden based on selected personalization menu state
		Given I am on the SaaSquatch docs page at the "../api/methods" location
		And a personalization menu is shown at the top of the main content section
		When I select <filterOption> with a corresponding <filterValue>
		Then the personalization menu is updated with the new <filterOption>
		And <apiMethod> is visible in the REST API Reference
		Examples:
			| filterOption                                     | filterValue  | apiMethod                                                               |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/account/{accountId}                              |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/open/account/{accountId}                         |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}           |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/code/{code}                                      |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/referrals                                        |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}/shareurls |
			| Docs are being personalised for new programs     | ga-only      | /api/v1/{tenant_alias}/theme/{locale}/variables/instance                |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/accountsync                                      |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/account/{accountId}/user/{userId}/sharelinks     |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/open/user/cookie_user                            |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/discount/{code}                                  |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/discount                                         |
			| Docs are being personalised for Classic programs | classic-only | /api/v1/{tenant_alias}/account/{accountId}/discount                     |
			| Docs are being personalised for all programs     | everything   | all api methods                                                         |

	Scenario Outline: Hidden Rest API Reference methods are shown at bottom of page
		Given I am on the SaaSquatch docs page at the ../api/methods location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option> with a corresponding <filter value>
		Then the personalization menu is updated with the new <filter option> and api methods not matching <filter value> are shown in the "Hidden Methods" section at the bottom of the "Rest API Reference" page
		Examples:
			| filter option                                    | filter value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

	Scenario Outline: Sidebar menu items are shown/hidden based on selected personalization state
		Given I am on a SaaSquatch docs page
		And I see a list of sidebar menu items
		When I select <filter option> with a corresponding <filter value>
		Then the personalization menu is updated with the new <filter option>
		And sidebar menu items that do not match <filter value> are hidden
		Examples:
			| filter option                                    | filter value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | unset        |

	Scenario Outline: Article content conditionally hides based on personalization state
		Given I am on a SaaSquatch docs Article
		And there is content wrapped with a <web component filter> container
		When I select <filter option> in the personalization menu
		Then the content wrapped with the <web component filter> are hidden
		And the content that are not wrapped are shown
		Examples:
			| web component filter | filter option                                    |
			| <classic-only>       | Docs are being personalised for new programs     |
			| <new-programs-only>  | Docs are being personalised for Classic programs |
			| N/A                  | Docs are being personalised for all programs     |

	@landmine
	Scenario: Adding an HTML tag without a newline between markdown content results in unformatted content
		Given I am on a SaaSquatch docs Article
		And an HTML tag is wrapping content without a newline e.g. <without newline>
		Then the markdown within the container is not formatted
		And when a newline is added e.g. <with newline>
		Then the markdown is formatted correctly
		Examples:
			| without newline | with newline |
			| <div>           | <div>        |
			| # test          |              |
			| </div>          | # test       |
			|                 |              |
			|                 | </div>       |
