import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import Tippy from "@tippyjs/react/headless";
import { useSearch } from "./useSearch";
import * as Styles from "./SearchStyles";
import { sanitizeGoogleSearchLink, isBlank } from "./searchUtil";

import hotkeys from "hotkeys-js";
import { useHistory } from "react-router";

const keyMap = {
  CLOSE: ["esc", "x"],
};

export function InlineSearch({ Input = Styles.DefaultInput }) {
  if (typeof document === "undefined") {
    return <div />;
  }
  const history = useHistory();
  const { query, response, setQuery, cat, setCat, setStartIndex } = useSearch();
  const showTippy = !isBlank(query);

  const [visible, setVisible] = useState(false);
  const [selectedIdx, setSelectedIndex] = useState(0);

  const maxResultsSize = response?.items?.length || 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  useLayoutEffect(() => {
    if (typeof document !== "undefined") {
      hotkeys("esc", function (event, handler) {
        // event.preventDefault();
        setVisible(false);
      });

      return () => hotkeys.unbind("esc");
    }
  }, [setVisible]);
  const onkeypressed = (evt) => {
    var code = evt.charCode || evt.keyCode;
    if (code == 27) {
      // Escape key -- cancel query
      setQuery("");
    } else if (
      code === 38
      // && selectedIdx >= -1
    ) {
      setSelectedIndex(selectedIdx - 1);
      event.preventDefault();
    } else if (
      code === 40
      // && selectedIdx < maxResultsSize
    ) {
      setSelectedIndex(selectedIdx + 1);
      event.preventDefault();
    } else if (code === 13) {
      // enter key
      const item = response?.items[selectedIdx];
      const url = sanitizeGoogleSearchLink(item.link);
      history.push(url);
      setVisible(false);
    }
  };

  return (
    <Styles.Inline>
      <Tippy
        visible={!isBlank(query) && visible}
        placement="bottom-start"
        interactive={true}
        interactiveBorder={20}
        // hideOnClick={false}
        render={(attrs) => (
          <Styles.PopOver tabIndex={-1} {...attrs}>
            {!response && (
              <div className="text-center search-spinner">
                <h3>Searching Help Center...</h3>
                <i className="fa fa-spinner fa-spin fa-5x"></i>
              </div>
            )}
            {response && (
              <InlineResults
                response={response}
                setStartIndex={setStartIndex}
                query={query}
                selectedIdx={selectedIdx}
              />
            )}
          </Styles.PopOver>
        )}
      >
        <Input
          type="text"
          name="q"
          placeholder="Search"
          value={query}
          onKeyUp={onkeypressed}
          onFocus={(e) => setVisible(true)}
          onBlur={(e) => setVisible(false)}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </Tippy>
    </Styles.Inline>
  );
}

export function InlineResults({ response, setStartIndex, query, selectedIdx }) {
  const { items, queries, searchInformation } = response;

  // Some pages have `meta` tags via `pagemap.metatags`, and things like ios/android don't.
  const getTitle = (item) => {
    const sanitize = (title: string) =>
      title.replace(" | SaaSquatch Documentation", "");
    try {
      return sanitize(items.pagemap.metatags[0].title);
    } catch (e) {}
    return sanitize(item.htmlTitle);
  };

  return (
    <>
      <div>Press Esc to close. Selected {selectedIdx} </div>
      {items &&
        items
          .filter((item) => item)
          .map((item, idx) => (
            <Styles.ItemRow
              to={sanitizeGoogleSearchLink(item.link)}
              selected={idx == selectedIdx}
            >
              <Styles.ItemTitle
                className="search-results-title"
                dangerouslySetInnerHTML={{
                  __html:
                    getTitle(item) +
                    `<i className="search-results-type fa"></i>`,
                }}
              />
              <Styles.ItemBody
                className="search-results-body"
                dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
              />
            </Styles.ItemRow>
          ))}
      {items && (
        <Styles.ResultsSummary>
          {searchInformation.totalResults} total results found in{" "}
          {searchInformation.formattedSearchTime} seconds
        </Styles.ResultsSummary>
      )}
      <Styles.Pagination>
        {queries?.previousPage && (
          <Styles.PagerButton
            onClick={() => setStartIndex(queries.previousPage[0].startIndex)}
          >
            Previous
          </Styles.PagerButton>
        )}

        {queries?.nextPage && (
          <Styles.PagerButton
            onClick={() => setStartIndex(queries.nextPage[0].startIndex)}
          >
            Next
          </Styles.PagerButton>
        )}
      </Styles.Pagination>

      {!items && isBlank(query) && (
        <div className="search-results-none text-center">
          <p className="lead">What are you looking for?</p>
        </div>
      )}
      {!items && !isBlank(query) && (
        <div className="search-results-none text-center">
          <h3 className="visible-desktop" style={{ paddingTop: "43px" }}>
            No matching Docs!
          </h3>
          <p className="lead">
            Looks like we couldn't find any Help Center page that matches your
            search term <strong>"{query}"</strong>
          </p>
        </div>
      )}
    </>
  );
}
