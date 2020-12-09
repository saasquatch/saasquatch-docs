/**
 * Finds the Query param with the given name.
 *
 * Straight stolen from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 *
 */
export function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function sanitizeGoogleSearchLink(link) {
  return link.replace("https://docs.referralsaasquatch.com", "").replace("https://docs.saasquatch.com", "");
}

export function isBlank(str) {
  return !str || /^\s*$/.test(str);
}
