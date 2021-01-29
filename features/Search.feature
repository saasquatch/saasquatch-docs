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

	Scenario: Sidebar search results are preserved when the search results section is hidden by clicking "close button" or outside the results section

	# sidebar search [close] button lacks styling
	Scenario: Sidebar search input shows a "close" button when input field is selected and input is entered

	Scenario: Sidebar search input can be cleared by pressing ESC

	Scenario: Sidebar search input will not be cleared by click the "close" button

	Scenario: Sidebar search input will not be cleared by clicking outside the modal
# sidebar search, with input, esc clears input
# sidebar search, with input, [close] does not clear input



# main page search
# main search input, large input expands container outside of window