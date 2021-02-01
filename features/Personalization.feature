@owner:lv
@author:am
Feature: Personalization

	- Personalization works (API sidebar, api reference)
	- Personalization toggle works

	Scenario: Personalization menu is shown
		Given I am on the SaaSquatch docs page at any location
		Then a Personalization menu is shown at the top of the main content section

	Scenario: Personalization menu default state

	Scenario: Personalization cookie is not dropped on first load

	Scenario: Personalization cookie is updated on first filter selection

	Scenario: Personalization menu filter state can be changed

	Scenario: Personalization cookie is updated

	Scenario: Personalization menu icon displayed

	Scenario: Personalization menu icons match

	Scenario: Personalization menu active icon is updated

	Scenario: Personalization menu state is maintained when navigating

	Scenario: Personalization menu state is maintaned when refreshing

	Scenario: Personalization menu state is lost when cookies are cleared

	Scenario: Personalization menu only one filter can be selected

	Scenario: Personalization menu seleted filter is shown

