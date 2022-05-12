//@ts-nocheck
import { ProductNewsCard } from "components/homepages/ProductNewsCard";
import React, { useState, useCallback } from "react";
import { useRouteData } from "react-static";

//@ts-ignore
import Markdown from "../../components/Markdown";
import PageHeader from "../../components/PageHeader";

const filterFns = {
  // show if post if from the past 30 days
  last_30: function (item) {
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
            >
              <option value="">All Posts</option>
              <option value="feature-release">Feature Releases</option>
              <option value="monthly-update">Monthly Updates</option>
              <option value="product-update">Product Updates</option>
            </select>
            {
            " " // Spacing between form elements
            }
            <select
              value={date}
              onChange={dateChange}
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
                <ProductNewsCard
                  tags={productNewsItem.tags}
                  title={productNewsItem.title}
                  markdownContent={productNewsItem.content}
                  datePublished={productNewsItem.datePublished}
                />
              );
            })}
        </div>
      </PageHeader>
    </>
  );
}
