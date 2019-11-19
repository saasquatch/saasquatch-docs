//@ts-nocheck
import React, { useLayoutEffect } from "react";
import Isotope from "isotope-layout";
import { useRouteData } from "react-static";

//@ts-ignore
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

export default function render() {

  const { productNews } = useRouteData();

  useLayoutEffect(() => {
    if (document !== undefined) onLoad();
  }, []);
  return (
    <>
      <PageHeader
        title="Product News"
        highlights="SaaSquatch product updates, improvements, and new feature releases."
      >
        <div id="form-ui">
          <p>
            <select className="isotope-product-news-select-group filters-isotope-product-news-select-group">
              <option value="">All Posts</option>
              <option value=".feature-release">Feature Releases</option>
              <option value=".monthly-update">Monthly Updates</option>
              <option value=".product-update">Product Updates</option>
            </select>

            <select className="isotope-product-news-select-group filters-isotope-product-news-select-group">
              <option value="">From All-time</option>
              <option value="last_30">Last 30 days</option>
              <option value="past_year">Past year</option>
            </select>
          </p>
        </div>

        <div className="grid no-anchor">
          {productNews.map((productNewsItem: any) => {
            return (
              <div
                className={
                  "product-news-item read-more-wrap " +
                  (productNewsItem.tags && productNewsItem.tags.join(" "))
                }
              >
                <div className="product-news-item-content">
                  <i
                    className="fa fa-2x fa-calendar product-news-item-icon"
                    aria-hidden="true"
                  ></i>
                  <h3 className="no-anchor product-news-item-title">
                    {productNewsItem.title}
                  </h3>
                  <p className="product-news-item-datePublished">
                    {productNewsItem.datePublished}
                  </p>
                  <div className="product-news-item-post-content">
                    <Markdown source={productNewsItem.content} />
                  </div>
                </div>
                <div className="product-news-post-footer">
                  <div className="product-news-post-footer-content">
                    <p className="product-news-post-footer-title">Tags</p>{" "}
                    {productNewsItem.tags.map((tag: string) => {
                      return (
                        <p className="product-news-item-footer-tag">{tag}</p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageHeader>
    </>
  );
}

function onLoad() {
  // @ts-ignore -- should import
  const $ = window.jQuery;

  var lineHeight = 20;
  var numLines = 1;
  // init Isotope
  // @ts-ignore
  var iso = new Isotope(".grid", {
    itemSelector: ".product-news-item",
    layoutMode: "fitRows",
    getSortData: {
      date: function(itemElem) {
        var unixDate =
          new Date(
            // @ts-ignore
            $(itemElem)
              .find(".product-news-item-datePublished")
              .text()
          ).getTime() / 1000;
        // @ts-ignore
        return parseInt(unixDate, 10);
      }
    },
    sortBy: "date",
    sortAscending: false
  });
  // filter functions
  var filterFns = {
    // show if post if from the past 30 days
    last_30: function(itemElem) {
      var postDate =
        new Date(
          $(itemElem)
            .find(".product-news-item-datePublished")
            .text()
        ).getTime() / 1000;
      //var postDate = new Date($(this).find('.datePublished').text()).getTime() / 1000;
      var thirtyDaysAgo = Math.floor(Date.now() / 1000) - 2592000;
      // @ts-ignore
      return parseInt(postDate, 10) > thirtyDaysAgo;
    },
    past_year: function(itemElem) {
      var postDate =
        new Date(
          $(itemElem)
            .find(".product-news-item-datePublished")
            .text()
        ).getTime() / 1000;
      var yearAgo = Math.floor(Date.now() / 1000) - 31536000;
      // @ts-ignore
      return parseInt(postDate, 10) > yearAgo;
    }
  };
  // bind filter on select change
  $(".filters-isotope-product-news-select-group").on("change", function() {
    // get filter value from option value
    var filterValue = this.value;

    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;

    //$grid.isotope({ filter: filterValue });
    iso.arrange({ filter: filterValue });
  });
}
