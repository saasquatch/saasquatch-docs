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

		Then the personalization menu is updated with the selected <filter option>

	Scenario: Personalization menu icon displayed
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		Then an icon that matches the currently selected filter option is visible

	Scenario: Personalization menu icons match
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the icon displayed is updated and matches <filter option>

	Scenario: Personalization menu active icon is updated
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the icon in the personalization menu that matches <filter option> displayed in colour and not grey

	Scenario: Personalization menu state is maintained when navigating
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the selected <filter option>
		When I navigate to different pages of the docs
		Then the selected <filter option> remains

	Scenario: Personalization menu state is maintained when refreshing
		Given I am on the SaaSquatch docs page at any location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option>

		Examples:
			| filter option                                    |
			| Docs are being personalised for new programs     |
			| Docs are being personalised for Classic programs |
			| Docs are being personalised for all programs     |

		Then the personalization menu is updated with the selected <filter option>
		When I refresh the docs page
		Then the selected <filter option> remains

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

	Scenario: Personalization menu selected filter is shown
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

	Scenario: Personalization cookie is not dropped on first load
		Given I load the SaaSquatch docs page at any location for the first time
		Then the personalization cookie containing personalization menu settings is not created

	Scenario: Personalization cookie is updated on first filter selection
		Given I load the SaaSquatch docs page at any location for the first time
		Then a cookie containing personalization menu settings is not created
		When I choose a personalization menu option for the first time
		Then the personalization cookie containing "docs-version" values is created

	Scenario: Personalization cookie is updated
		Given I load the SaaSquatch docs page at any location
		When I select <filter option>

		Examples:
			| filter option                                    | cookie value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

		Then the personalization cookie is updated with a corresponding <cookie value> that matches <filter option>

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

	# currently fails, not implemented yet?
	Scenario: Rest API Reference methods are shown/hidden based on selected personalization menu state
		Given I am on the SaaSquatch docs page at the ../api/methods location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option> with a corresponding <filter value>

		Examples:
			| filter option                                    | filter value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

		Then the personalization menu is updated with the new <filter option>

		Examples:
			| api methods                                                             | visible      |
			| /api/v1/{tenant_alias}/accountsync                                      | classic-only |
			| /api/v1/{tenant_alias}/account/{accountId}/user/{userId}/sharelinks     | classic-only |
			| /api/v1/{tenant_alias}/open/user/cookie_user                            | classic-only |
			| /api/v1/{tenant_alias}/open/user/cookie_user                            | classic-only |
			| /api/v1/{tenant_alias}/discount/{code}                                  | classic-only |
			| /api/v1/{tenant_alias}/discount                                         | classic-only |
			| /api/v1/{tenant_alias}/account/{accountId}/discount                     | classic-only |
			| /api/v1/{tenant_alias}/account/{accountId}                              | ga-only      |
			| /api/v1/{tenant_alias}/open/account/{accountId}                         | ga-only      |
			| /api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}           | ga-only      |
			| /api/v1/{tenant_alias}/code/{code}                                      | ga-only      |
			| /api/v1/{tenant_alias}/referrals                                        | ga-only      |
			| /api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}/shareurls | ga-only      |
			| /api/v1/{tenant_alias}/theme/{locale}/variables/instance                | ga-only      |

		And the Rest API Reference items <api methods> are updated to match <visible> as defined by <filter value>

	# currently fails, not implemented yet?
	Scenario: Hidden Rest API Reference methods are shown at bottom of page
		Given I am on the SaaSquatch docs page at the ../api/methods location
		And a personalization menu is shown at the top of the main content section
		When I select <filter option> with a corresponding <filter value>

		Examples:
			| filter option                                    | filter value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

		Then the personalization menu is updated with the new <filter option> and api methods not matching <filter value> are shown in the "Hidden Methods" section at the bottom of the "Rest API Reference" page

	# currently fails, not implemented yet?
	Scenario: Sidebar menu items are shown/hidden based on selected personalization menu state
		Given I am on the SaaSquatch docs page at the ../api/methods location
		And a list of methods is shown in the sidebar menu under "Full list of Methods"
		When I select <filter option> with a corresponding <filter value>

		Examples:
			| filter option                                    | filter value |
			| Docs are being personalised for new programs     | ga-only      |
			| Docs are being personalised for Classic programs | classic-only |
			| Docs are being personalised for all programs     | everything   |

		Then the personalization menu is updated with the new <filter option>
		And sidebar menu items that do not match <filter value> are hidden
