import React from "react";
import Tippy from "@tippyjs/react/headless";
import { useSearch } from "./useSearch";
import * as Styles from "./SearchStyles";
import { sanitizeGoogleSearchLink, isBlank } from "./searchUtil";

export function InlineSearch({
  Input = Styles.DefaultInput,
}) {
  if (typeof document === "undefined") {
    return <div />;
  }
  const { query, response, setQuery, cat, setCat, setStartIndex } = useSearch();
  const showTippy = !isBlank(query);
  return (
    <>
      <Styles.Inline>
        <Tippy
          // visible={showTippy}
          trigger="focus"
          placement="bottom-start"
          interactive={true}
          interactiveBorder={20}
          hideOnClick={false}
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </Tippy>
      </Styles.Inline>
    </>
  );
}

export function InlineResults({ response, setStartIndex, query }) {
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
      {items &&
        items
          .filter((item) => item)
          .map((item) => (
            <Styles.ItemRow to={sanitizeGoogleSearchLink(item.link)}>
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
