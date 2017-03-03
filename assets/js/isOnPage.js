/**
 * 
 * Detects if two HREFs are on teh same page. Helpful for Anchor detection and same-page scrolling
 * 
 */
module.exports = function isOnPage(thisPage, thatPage) {
    var thisUrl = thisPage.split("#")[0].replace(/\/+$/, "");
    var thatUrl = thatPage.split("#")[0].replace(/\/+$/, "");
    return thisUrl == thatUrl;
};