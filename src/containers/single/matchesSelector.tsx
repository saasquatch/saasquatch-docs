export function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches ||
    p.webkitMatchesSelector ||
    // @ts-ignore
    p.mozMatchesSelector ||
    // @ts-ignore
    p.msMatchesSelector ||
    function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
  return f.call(el, selector);
}
