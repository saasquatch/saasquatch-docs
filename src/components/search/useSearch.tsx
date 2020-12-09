import { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import { useDebouncedCallback } from "use-debounce";

import { getParameterByName } from "components/search/searchUtil";

export function useSearch() {
  const [response, setResponse] = useState(null);

  // Only run in the browser
  const jQuery = require("jquery");
  const { windowDotEnv } = useSiteData();

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

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      jQuery.ajax({
        url: "https://www.googleapis.com/customsearch/v1",
        dataType: "jsonp",
        jsonp: "callback",
        data: value,
        // Work with the response
        success: function (response) {
          setResponse(response);
        },
      });
    },
    // delay in ms
    100
  );

  useEffect(() => {
    debounced.callback(dataObj);
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
