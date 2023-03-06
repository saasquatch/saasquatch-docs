import React from "react";
import { marked } from "marked";

import Markdown from "./Markdown";

// Load string polyfills
polyfill();

function empty() {
  return "";
}
const ToCRenderer = {
  html(html) {
    return "";
  },
  heading(text, level, raw, slugger) {
    const slug = raw.toLowerCase().replace(/[^\w]+/g, "-");
    // TODO: Upgade to newer Marked for better slug support
    // const slug = slugger.slug(raw);

    return level + `- [${raw}](#${slug})\n`;
  },
  br: empty,
  code: empty,
  blockquote: empty,
  hr: empty,
  list: empty,
  listitem: empty,
  checkbox: empty,
  paragraph: empty,
  table: empty,
  tablerow: empty,
  tablecell: empty,
  text: empty,
  strong: empty,
  link: empty,
  image: empty,
  em: empty,
  codespan: empty,
};

function parseList(string) {
  const list = string.split("\n");
  let prev = 0;
  let spacing = 0;
  let currentBranch = [];
  let result = "";

  list.forEach((str) => {
    // separate level and heading
    const level = parseInt(str.slice(0, 1));
    const heading = str.substring(1);
    currentBranch = currentBranch.filter((node) => node["level"] < level);

    spacing = 1;

    // Make spacing equal to existing levels
    currentBranch.forEach((node) => {
      if (level > node["level"]) {
        spacing += 1;
      } else {
        return;
      }
    });

    // No existing levels: Start new branch
    if (spacing === 1) {
      currentBranch = [];
    }
    currentBranch.push({ level, spacing });

    prev = level;
    const leadingSpace = "  ".repeat(spacing - 1);
    result = result + leadingSpace + heading + "\n";
  });

  return result;
}

export default function render({ source }) {
  if (!source) return <div />;
  marked.use({ renderer: ToCRenderer });
  const outs = marked.parse(source);
  marked.use();
  const parsedList = parseList(outs);
  if (!parsedList) return <div />;

  return <Markdown source={parsedList} />;
}

function polyfill() {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
      "use strict";
      if (this == null)
        throw new TypeError("can't convert " + this + " to object");

      var str = "" + this;
      // To convert string to integer.
      count = +count;
      // Check NaN
      if (count != count) count = 0;

      if (count < 0) throw new RangeError("repeat count must be non-negative");

      if (count == Infinity)
        throw new RangeError("repeat count must be less than infinity");

      count = Math.floor(count);
      if (str.length == 0 || count == 0) return "";

      // Ensuring count is a 31-bit integer allows us to heavily optimize the
      // main part. But anyway, most current (August 2014) browsers can't handle
      // strings 1 << 28 chars or longer, so:
      if (str.length * count >= 1 << 28)
        throw new RangeError(
          "repeat count must not overflow maximum string size"
        );

      var maxCount = str.length * count;
      count = Math.floor(Math.log(count) / Math.log(2));
      while (count) {
        str += str;
        count--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    };
  }
}
