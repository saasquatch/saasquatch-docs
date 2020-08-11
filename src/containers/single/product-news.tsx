//@ts-nocheck
import React, { useState, useCallback } from "react";
import { useRouteData } from "react-static";

//@ts-ignore
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

const filterFns = {
  // show if post if from the past 30 days
  last_30: function (item) {
    console.log("Date Published", item)
    const postDate = new Date(item.datePublished).getTime() / 1000;
    //var postDate = new Date($(this).find('.datePublished').text()).getTime() / 1000;
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 2592000;
    return parseInt(postDate, 10) > thirtyDaysAgo;
  },
  past_year: function (item) {
    const postDate = new Date(item.datePublished).getTime() / 1000;
    const yearAgo = Math.floor(Date.now() / 1000) - 31536000;
    return parseInt(postDate, 10) > yearAgo;
  },
};

export default function render() {
  const { productNews } = useRouteData();

  const [date, setDate] = useState<string>("");
  const [tag, setTags] = useState<string>("");

  const dateChange = useCallback((e) => setDate(e.target.value), [setDate]);
  const tagChange = useCallback((e) => setTags(e.target.value), [setTags]);

  const filter = (item) => {
    const matchesTags = tag === "" || (item.tags && item.tags.includes(tag));
    const matchesDate = date === "" || filterFns[date](item);
    return matchesTags && matchesDate;
  };
  const sort = (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();

  return (
    <>
      <PageHeader
        title="Product News"
        highlights="SaaSquatch product updates, improvements, and new feature releases."
      >
        <div id="form-ui">
          <p>
            <select
              value={tag}
              onChange={tagChange}
              className="isotope-product-news-select-group filters-isotope-product-news-select-group"
            >
              <option value="">All Posts</option>
              <option value="feature-release">Feature Releases</option>
              <option value="monthly-update">Monthly Updates</option>
              <option value="product-update">Product Updates</option>
            </select>

            <select
              value={date}
              onChange={dateChange}
              className="isotope-product-news-select-group filters-isotope-product-news-select-group"
            >
              <option value="">From All-time</option>
              <option value="last_30">Last 30 days</option>
              <option value="past_year">Past year</option>
            </select>
          </p>
        </div>

        <div className="grid no-anchor">
          {productNews
            .filter(filter)
            .sort(sort)
            .map((productNewsItem: any) => {
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
