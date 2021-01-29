@owner:lv
@author:am
Feature: Search

	Search for sidebar and main page
	Search (i.e. click, enter, esc, scroll, inline search vs full search page)

	# sidebar search

	Scenario: A search input field is shown in the sidebar

	Scenario: Sidebar search input is empty by default

	Scenario: Sidebar search input placeholder value is "Search"

	Scenario: Sidebar search input shows a search results section when input field has input

	Scenario: Sidebar search input does not show a search results section when there is no input

	Scenario: Sidebar search shows no results by default

	# currently fails as search terms with many results overflow the browser window
	Scenario: Sidebar search results are scroll-able

	# currently fails as search terms with many results overflow the browser window
	Scenario: Sidebar search results are limited to {some number} of results

	Scenario: Sidebar search results are preserved when the search results section is hidden by clicking "close button" or outside the results section

	Scenario: Arbitrarily large search input can be entered

	# sidebar search [close] button lacks styling
	Scenario: Sidebar search input shows a "close" button when input field is selected and input is entered

	Scenario: Sidebar search input can be cleared by pressing ESC

	Scenario: Sidebar search input will not be cleared by click the "close" button

	Scenario: Sidebar search input will not be cleared by clicking outside the search results preview container

	# main page search

	Scenario: A search input field is shown on the main docs page

	Scenario: Main page search input in empty by default

	Scenario: Main page search will start searching and display results and input is entered
