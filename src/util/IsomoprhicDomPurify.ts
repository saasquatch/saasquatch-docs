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
  typeof document !== "undefined"
    ? DOMPurify
    : (function () {
        // Evil, but needed so Webpack doesn't bundle jsdom in a server environment
        // Source: https://github.com/webpack/webpack/issues/8826#issuecomment-490811170
        const { JSDOM } = r(eval("require")("jsdom"));

        const { window } = new JSDOM("<!DOCTYPE html>");
        return DOMPurify(window);
      })();

export default dompurify;
