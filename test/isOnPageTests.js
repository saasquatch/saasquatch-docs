const expect = require("chai").expect;
const isOnPage = require('../assets/js/isOnPage');

describe("Built site", function() {

    it("Should work with relative links",function() {
       expect(isOnPage("/relative#achor", "/relative")).to.be.true;
       expect(isOnPage("/relative/#achor", "/relative")).to.be.true;
       expect(isOnPage("/relative#achor", "/relative/")).to.be.true;
    });
    it("Should work with subfolders",function() {
       expect(isOnPage("/sub/relative#achor", "/sub/relative/")).to.be.true;
       expect(isOnPage("/sub/relative#achor", "/sub/relative/")).to.be.true;
       expect(isOnPage("/sub/relative#achor", "/sub/relative/")).to.be.true;


       expect(isOnPage("/relative#achor", "/sub/relative/")).to.be.false;
       expect(isOnPage("/relative#achor", "/sub/relative/")).to.be.false;
       expect(isOnPage("/relative#achor", "/sub/relative/")).to.be.false;

       expect(isOnPage("/sub/relative#achor", "/relative")).to.be.false;
       expect(isOnPage("/sub/relative/#achor", "/relative")).to.be.false;
       expect(isOnPage("/sub/relative#achor", "/relative/")).to.be.false;
    });
    it("Should work with hostnames",function() {
       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.co/relative/")).to.be.true;
       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.co/relative/")).to.be.true;
       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.co/relative/")).to.be.true;

       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.ch/relative/")).to.be.false;
       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.ch/relative/")).to.be.false;
       expect(isOnPage("https://ssqt.co/relative#achor", "https://ssqt.ch/relative/")).to.be.false;

    });
});