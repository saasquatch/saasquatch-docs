/***
 * Makes it possible to use DOMPurify on server and client in the same way.

 *
 *
 * Forked from https://github.com/kkomelin/isomorphic-dompurify
 */
import DOMPurify from "dompurify";

function r(m) {
  return (m && m.default) || m;
}
const dompurify =
  typeof process === "undefined"
    ? DOMPurify
    : (function () {
        const { JSDOM } = r(require("jsdom"));
        const { window } = new JSDOM("<!DOCTYPE html>");
        return DOMPurify(window);
      })();

export default dompurify;
