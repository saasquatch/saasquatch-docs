import React, { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import Tippy from "@tippyjs/react/headless";

import * as Styles from "../components/search/SearchStyles";
import Meta from "../components/Meta";

export function useSearch() {
  const [response, setResponse] = useState(null);

  //     ---
  // slug: search
  // template: fullpage.html
  // category: search
  // ---
  // Only run in the browser
  const jQuery = require("jquery");

  const { windowDotEnv } = useSiteData();
  /**
   *
   *  Docs Search
   *
   *
   *  Uses google custom search, Handlebars, and format
   *
   */

  // var categoryFilter = "more:pagemap:metatags-type:jsReference";
  let initialIndex = 0;
  try {
    initialIndex = parseInt(getParameterByName("startIndex"));
  } catch (e) {}
  const initialState = {
    query: getParameterByName("q"),
    cat: getParameterByName("cat"),
    startIndex: initialIndex,
  };
  const [{ query, cat, startIndex }, setState] = useState(initialState);

  function setQuery(newValue: string) {
    setState({
      // If you change the query, go back to page 0
      startIndex: 0,
      cat,
      query: newValue,
    });
  }
  function setCat(cat: string) {
    setState({
      query,
      cat,
      // If you change the category, go back to page 0
      startIndex: 0,
    });
  }
  function setStartIndex(startIndex) {
    setState({
      query,
      cat,
      startIndex,
    });
  }

  //   jQuery(".js-search-form input[name=cat]").val([cat]);

  let privateQuery;
  if (cat && cat.length > 1) {
    // privateQuery = query + " more:pagemap:metatags-type:" + cat;
    privateQuery = query + " more:pagemap:metatags-docsCategory:" + cat;
  } else {
    privateQuery = query;
  }

  let dataObj = {
    q: privateQuery,
    cx: windowDotEnv.GCSE_CX,
    key: windowDotEnv.GCSE_KEY,
    format: "json",
    start: undefined,
  };

  if (startIndex) {
    dataObj.start = startIndex;
  }

  useEffect(() => {
    jQuery.ajax({
      url: "https://www.googleapis.com/customsearch/v1",
      dataType: "jsonp",
      jsonp: "callback",
      data: dataObj,

      // Work with the response
      success: function (response) {
        setResponse(response);
      },
    });
  }, [query, cat, startIndex]);

  return {
    response,
    query,
    setQuery,
    cat,
    setCat,
    setStartIndex,
  };
}

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

export const Example = () => (
  <Tippy
    visible={true}
    render={(attrs) => (
      <Styles.PopOver tabIndex={-1} {...attrs}>
        My tippy box
      </Styles.PopOver>
    )}
  >
    <button>My button</button>
  </Tippy>
);

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

type InputComponent = typeof Styles.DefaultInput;

export function InlineSearch({
  Input = Styles.DefaultInput,
}: {
  Input?: InputComponent;
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

/**
 * Finds the Query param with the given name.
 *
 * Straight stolen from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 *
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sanitizeGoogleSearchLink(link) {
  return link.replace("https://docs.referralsaasquatch.com", "");
}
