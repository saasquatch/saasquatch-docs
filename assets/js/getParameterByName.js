
/**
 * Finds the Query param with the given name.
 * 
 * Straight stolen from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * 
 */
export default function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};