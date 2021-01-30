@owner:lv
@author:am
Feature: Search

	Search for sidebar and main page
	Search (i.e. click, enter, esc, scroll, inline search vs full search page)

	# sidebar search
	Scenario: Sidebar search input field is shown in the sidebar
		Given I am on the SaaSquatch docs page at any location
		Then A search input field is shown in the sidebar

	Scenario: Sidebar search input field is empty by default
		Given I load a SaaSquatch docs page at any location for the first time
		And I have not entered any search terms into the search input field
		Then The default state for the search input field is empty

	Scenario: Sidebar search input field placeholder value is "Search"
		Given I am on the SaaSquatch docs page at any location
		And I have not entered any search terms into the search input field
		Then An empty search input field is shown with the placeholder value set to "Search"

	Scenario: Sidebar search displays results in real time as search terms are entered
		Given I am on the SaaSquatch docs page at any location
		Then A search input field is shown in the sidebar
		When I enter search terms into the search input field
		Then Results relevant to my search terms are displayed in real time as I type

	Scenario: Sidebar search does not show the results section when there are no search terms present
		Given I am on the SaaSquatch docs page at any location
		Then A search input field is shown in the sidebar
		When There are no search terms present in the search input field
		Then The search results section is not shown

	Scenario: Sidebar search does not show the results section when search terms are deleted
		Given I am on the SaaSquatch docs page at any location
		And A search input field is shown in the sidebar
		When I enter search terms into the search input field
		Then Results relevant to my search terms are displayed in real time as I type
		When I delete my search terms
		Then The search results section is no longer shown

	Scenario: Sidebar search displays no results by default
		Given I load the SaaSquatch docs page at any location for the first time
		And I have not entered any input to the search input field
		And A search input field is shown in the sidebar with no input
		Then The search results section is not shown

	# not implemented, currently fails as search terms with many results overflow the browser window
	Scenario: Sidebar search results are scroll-able
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns a large number of matches
		Then Search results relevant to my search term are displayed in real time as I type
		And My browser window height is less than allows for the returned results to be displayed
		Then I can scroll up and down through my search results

	# not implemented, currently fails as search terms with many results overflow the browser window
	Scenario: Sidebar search results are limited to {someNumber} of results
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns a large number of matches
		Then Search results relevant to my search term are displayed in real time as I type
		And My browser window height is less than allows for the returned results to be displayed
		Then The search results are limited to someNumber of results

	Scenario: Sidebar search results are preserved when the search results section is hidden by clicking outside the results section
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		Then Search results relevant to my search term are displayed in real time as I type
		When I click outside the search results section
		Then The search results section is hidden and my search terms are preserved
		When I click back into the search input field
		Then The search results section is shown and my search terms and results are preserved

	Scenario: Sidebar search results are preserved when the search results section is hidden by clicking the "close" button
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		Then Search results relevant to my search term are displayed in real time as I type
		When I click the "close" button/link
		Then The search results section is hidden and my search terms are preserved
		When I click back into the search input field
		Then The search results section is shown and my search terms and results are preserved

	Scenario: Sidebar search input will be cleared when pressing Esc
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		Then Search results relevant to my search term are displayed in real time as I type
		When I press "Esc"
		Then The search results section is hidden and my search terms are deleted
		When I click back into the search input field
		Then The search results section is not shown and my search terms are not preserved

	Scenario: Sidebar search allows arbitrarily large input
		Given I am on the SaaSquatch docs page at any location
		And A search input field is shown in the sidebar
		When I enter arbitrarily large input containing 10,000 or more characters
		Then There is no limit for allowable search term input

	Scenario: Sidebar search results can be navigated with up/down keypresses
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		And Search results relevant to my search term are displayed in real time as I type
		When the search input field is selected and up/down keypresses are entered
		Then I can navigate through the search results

	Scenario: Sidebar search results can be navigated to by an Enter keypress
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		And Search results relevant to my search term are displayed in real time as I type
		When A search result is selected and I enact an "enter" keypress
		Then The docs page for that selected result is displayed

	Scenario: Sidebar search results can be navigated to by clicking on results
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		And Search results relevant to my search term are displayed in real time as I type
		When I click on a search result
		Then The docs page for that selected result is displayed

	# currently fails, sidebar search [close] button lacks styling
	Scenario: Sidebar search input shows a "close" button when input field is selected and input is entered
		Given I am on the SaaSquatch docs page at any location
		And I have entered a search term into the search input field that returns any number of matches
		And Search results relevant to my search term are displayed in real time as I type
		Then a "close" button/link is displayed with styling consistent to other areas of the SaaSquatch docs

	# main page search
	Scenario: Main page search input field is shown on the main docs page
		Given I am on the SaaSquatch docs main page
		Then A search input field is shown

	Scenario: Main page search input is empty by default
		Given I am on the SaaSquatch docs main page
		And I have not entered any terms into the search input field
		Then An empty search input field shown

	Scenario: Main page search input placeholder value is "Search"
		Given I am on the SaaSquatch docs main page
		And I have not entered any terms into the search input field
		Then An empty search input field is shown with the placeholder value set to "Search"

	Scenario: Main page search displays results in real time as search terms are entered
		Given I am on the SaaSquatch docs main page
		Then A search input field is shown
		When I enter a search term into the search input field
		Then Results relevant to my search term are displayed in real time as I type