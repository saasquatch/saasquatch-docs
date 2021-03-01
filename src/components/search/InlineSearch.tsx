import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Tippy from "@tippyjs/react/headless";
import hotkeys from "hotkeys-js";
import { useHistory } from "react-router";

import { useSearch } from "./useSearch";
import * as Styles from "./SearchStyles";
import { sanitizeGoogleSearchLink, isBlank } from "./searchUtil";
import useBrowserEffect from "src/util/useBrowserEffect";

export function InlineSearch({ Input = Styles.DefaultInput, sideBar = false }) {
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
  useBrowserEffect(() => {
    hotkeys("esc", function (event, handler) {
      // event.preventDefault();
      setVisible(false);
    });
    return () => hotkeys.unbind("esc");
  }, [setVisible]);
  const inputEl = useRef<HTMLInputElement>(null);
  const resultsEl = useRef<HTMLDivElement>(null);
  const contains = useCallback(
    (el) => {
      if (inputEl.current && inputEl.current.contains(el)) {
        return true;
      }
      if (resultsEl.current && resultsEl.current.contains(el)) {
        return true;
      }
    },
    [inputEl.current, resultsEl.current]
  );
  useBrowserEffect(() => {
    const handler = (e) => {
      const { target } = e;
      if (target) {
        if (contains(target)) {
          // If descendant of the input box of results
          // Do nothing
        } else {
          // If click anywhere else
          // Hide the search results if they are open;
          setVisible(false);
        }
      }
    };

    document.documentElement.addEventListener("click", handler);
    return () => document.documentElement.removeEventListener("click", handler);
  }, [setVisible, contains]);

  const onkeypressed = (evt) => {
    var code = evt.charCode || evt.keyCode;
    if (code == 27) {
      // Escape key -- cancel query
      evt.preventDefault();
      setQuery("");
    } else if (
      code === 38
      // && selectedIdx >= -1
    ) {
      evt.preventDefault();
      setSelectedIndex(selectedIdx - 1);
    } else if (
      code === 40
      // && selectedIdx < maxResultsSize
    ) {
      evt.preventDefault();
      setSelectedIndex(selectedIdx + 1);
    } else if (code === 13) {
      // enter key
      evt.preventDefault();
      const item = response?.items[selectedIdx];
      const url = sanitizeGoogleSearchLink(item.link);
      history.push(url);
      setVisible(false);
    }
  };
  const hide = useCallback(() => setVisible(false), [setVisible]);

  const delayedHide = useCallback(() => {
    // On blur prevents race condition between clicking on a result and hiding the search results
    setTimeout(() => {
      setVisible(false);
    }, 100);
  }, [setVisible]);

  return (
    <Styles.Inline>
      <Tippy
        visible={!isBlank(query) && visible}
        placement={sideBar ? "bottom-start" : "bottom"}
        interactive={true}
        interactiveBorder={20}
        // hideOnClick={false}
        render={(attrs) => (
          <Styles.PopOver tabIndex={-1} sideBar={sideBar} {...attrs}>
            {!response && (
              <div className="text-center search-spinner">
                <h3>Searching Help Center...</h3>
                <i className="fa fa-spinner fa-spin fa-5x"></i>
              </div>
            )}
            {response && (
              <Styles.Container sideBar={sideBar}>
                <InlineResults
                  response={response}
                  setStartIndex={setStartIndex}
                  query={query}
                  selectedIdx={selectedIdx}
                  close={() => setVisible(false)}
                  childRef={resultsEl}
                />
              </Styles.Container>
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
          // onBlur={(e) => delayedHide()}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          ref={inputEl}
        />
      </Tippy>
    </Styles.Inline>
  );
}

export function InlineResults({
  response,
  setStartIndex,
  query,
  selectedIdx,
  close,
  childRef,
}: {
  response: any;
  setStartIndex: (next: number) => void;
  query: string;
  selectedIdx: number;
  close: () => void;
  childRef: RefObject<HTMLDivElement>;
}) {
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
    <div ref={childRef}>
      <div style={{ textAlign: "right" }}>
        Press Esc to{" "}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
        >
          close
        </a>
        .
      </div>
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
            search term <strong style={{overflowWrap:"break-word"}}>"{query}"</strong>
          </p>
        </div>
      )}
    </div>
  );
}
