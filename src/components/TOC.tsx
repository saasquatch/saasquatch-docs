import React from "react";
import marked from "marked";

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
    const slug = raw.toLowerCase().replace(/[^\w]+/g, '-');
    // TODO: Upgade to newer Marked for better slug support
    // const slug = slugger.slug(raw);

    return level + `- [${raw}](#${slug})\n`;

    // const leadingSpace = " ".repeat(level);
    // return leadingSpace + `- [${raw}](#${slug})\n`;
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
  codespan: empty
};

export function parseList(string){
  const list = string.split("\n");
  let result = '';
  let startLevel = undefined;

  list.forEach(str => {
    const level =  parseInt( str.slice(0,1) );
    const heading = str.substring(1);

    if( level < startLevel || startLevel === undefined ){
      startLevel = level;
    }

    const leadingSpace = "  ".repeat(level - startLevel);
    result = result + '\n' + leadingSpace + heading;
  });

  return result;
}


export default function render({ source }) {
  if (!source) return <div />;
  const outs = marked(source, { renderer: ToCRenderer });
  const parsedList = parseList(outs);
  if (!parsedList) return <div />;

  return <Markdown source={parsedList} />;
}

function polyfill() {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
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
