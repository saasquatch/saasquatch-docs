var expect = require("chai").expect;
var getSize = require('get-folder-size');
var path = require('path');
var glob = require('glob');

describe("Built site", function() {
    var buildDir = path.resolve(__dirname,'../build');
    
    it("Size great than 10mb", function(done) {
        getSize(buildDir, function(err, size) {
          if (err) { throw err; }
          var mb = (size / 1024 / 1024).toFixed(2);
          expect(mb).to.greaterThan(10);
          done();
        });
    });

    it("Shouldn't contain .js files outside the assets folder", function(done) {
        glob(buildDir+"/!(assets)/*.js", function (er, files) {
          expect(files).to.be.empty;
          done();
        });
    });
    
});