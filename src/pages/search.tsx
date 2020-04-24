import React from "react";
import Tippy from "@tippyjs/react/headless";

import * as Styles from "../components/search/SearchStyles";
import Meta from "../components/Meta";
import { useSearch } from "../components/search/useSearch";
import { isBlank } from "components/search/searchUtil";

export default function render() {
  if (typeof document === "undefined") {
    return <div />;
  }
  const { query, response, setQuery, cat, setCat, setStartIndex } = useSearch();

  const entry = {
    title: "Search results for " + query,
  };
  return (
    <>
      <Meta {...entry} />
      <section className="page" id="js-docs-search-results">
        <div className="well search-page">
          <div className="row-fluid text-center">
            <h3>Help Center Search</h3>
            <form className="js-search-form form-search" action="/search/">
              <div className="input-append">
                <input
                  type="text"
                  className="search-query"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="btn">
                  Search Help Center
                </button>
              </div>
              <div>
                <label className="radio inline">
                  <input
                    type="radio"
                    name="cat"
                    value=""
                    checked={cat === ""}
                    onChange={() => setCat("")}
                  />
                  All
                </label>
                <label className="radio inline successCenter">
                  <input
                    type="radio"
                    name="cat"
                    value="successCenter"
                    checked={cat === "successCenter"}
                    onChange={() => setCat("successCenter")}
                  />
                  Success
                </label>
                <label className="radio inline developerCenter">
                  <input
                    type="radio"
                    name="cat"
                    value="developerCenter"
                    checked={cat === "developerCenter"}
                    onChange={() => setCat("developerCenter")}
                  />
                  Developer
                </label>
                <label className="radio inline designerCenter">
                  <input
                    type="radio"
                    name="cat"
                    value="designerCenter "
                    checked={cat === "designerCenter"}
                    onChange={() => setCat("designerCenter")}
                  />
                  Designer
                </label>
              </div>
            </form>

            <a href="/" className="">
              Back to Help Center
            </a>
          </div>

          <div className="row-fluid">
            <div id="pretty-results" className="search-results">
              {!response && (
                <div className="text-center search-spinner">
                  <h3>Searching Help Center...</h3>
                  <i className="fa fa-spinner fa-spin fa-5x"></i>
                </div>
              )}
              {response && response.error && (
                <div className="text-center">
                  <h3>{response.error.message}</h3>
                </div>
              )}
              {response && !response.error && (
                <Results
                  response={response}
                  setStartIndex={setStartIndex}
                  query={query}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export type InputComponent = typeof Styles.DefaultInput;

export function Results({ response, setStartIndex, query }) {
  const { items, queries, searchInformation } = response;

  // Some pages have `meta` tags via `pagemap.metatags`, and things like ios/android don't.
  const getTitle = (item) => {
    try {
      return items.pagemap.metatags[0].title;
    } catch (e) {}
    return item.htmlTitle;
  };

  return (
    <>
      {items &&
        items
          .filter((item) => item)
          .map((item) => (
            <div
              className={
                "search-results-item " +
                (item.pagemap &&
                  item.pagemap.metatags[0] &&
                  item.pagemap.metatags[0].docssectiontype) +
                " " +
                (item.pagemap &&
                  item.pagemap.metatags[0] &&
                  item.pagemap.metatags[0].docscategory)
              }
            >
              <a href={item.link} className="clearfix">
                <div
                  className="search-results-title"
                  dangerouslySetInnerHTML={{
                    __html:
                      getTitle(item) +
                      `<i className="search-results-type fa"></i>`,
                  }}
                />
                <div
                  className="search-results-link"
                  dangerouslySetInnerHTML={{ __html: item.htmlFormattedUrl }}
                />
                <div
                  className="search-results-body"
                  dangerouslySetInnerHTML={{ __html: item.htmlSnippet }}
                />
              </a>
            </div>
          ))}
      {items && (
        <p>
          {searchInformation.totalResults} total results found in{" "}
          {searchInformation.formattedSearchTime} seconds
        </p>
      )}
      <div className="docs-search-pager">
        {queries?.previousPage && (
          <a
            onClick={() => setStartIndex(queries.previousPage[0].startIndex)}
            className="btn js-search-pager"
          >
            Previous
          </a>
        )}

        {queries?.nextPage && (
          <a
            onClick={() => setStartIndex(queries.nextPage[0].startIndex)}
            className="btn js-search-pager"
          >
            Next
          </a>
        )}
      </div>

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
