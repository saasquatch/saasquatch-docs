const expect = require("chai").expect;
var _ = require('lodash');

const resolveI18n = require('../metalsmith/utils/resolveI18n');

const fixtures = require('./fixtures/contentful');
const expected0 = require('./fixtures/contentful0');
const expected1 = require('./fixtures/contentful1');


describe("Built site", function() {

    it("Should resolve simple objects",function() {
       expect(resolveI18n(fixtures[0])).to.deep.equal(expected0);
    });
    
    it("Shouldn't mess up simple objects without i18n",function() {
       expect(resolveI18n(expected0)).to.deep.equal(expected0);
    });

    it("Should resolve nested objects",function() {
      var nested = _.filter(fixtures, _.matches({"sys":{"id": "4wEiUCzFMIOS2Mw6oSY8qc"}}))[0];
      expect(resolveI18n(nested)).to.deep.equal(expected1);
    });
    
    it("Shouldn't mess up nested objects without i18n",function() {
      expect(resolveI18n(expected1)).to.deep.equal(expected1);
    });

});