/**
 * Automatically pulls in the latest version of Squatch.js docs.
 * 
 * 
 */
var rp = require('request-promise');
var markdownToc = require('markdown-toc');

// TODO: Switch to: https://unpkg.com/
// e.g. Squatch.js v1 = https://unpkg.com/@saasquatch/squatch-js@^1
// e.g. Squatch.js v2 = https://unpkg.com/@saasquatch/squatch-js@^2
var packageSrc = 'https://unpkg.com/@saasquatch/squatch-js@^2';

module.exports = plugin;

function plugin() {
  return function(files, metalsmith, done) {
    var squatchJsReferenceFile = {
      title: 'squatch.js Version 2 Reference',
      highlights: 'squatch.js is the Referral SaaSquatch javascript SDK and a one-stop shop to integrate a referral program into your website or web app. It can show referral widgets on any website, track users, generate unique referral short links and referral codes, and more.',
      slug: 'developer/squatchjs/v2/reference',
      sectionType: 'jsReference',
      template: 'pages/squatchjsReference.html'
      // hero: true
    };
    
    rp({
        uri: packageSrc + '/package.json',
        json: true
      })
      .then(function(packageInfo) {
        squatchJsReferenceFile.version = packageInfo.version;
        return rp({
          uri: packageSrc + '/docs/docs.md'
        });
      })
      .then(function(markdownSource) {
        squatchJsReferenceFile.contents = markdownSource;
        squatchJsReferenceFile.markdownToc = markdownToc(markdownSource);
        files['squatch-generated.md'] = squatchJsReferenceFile;
        done();
      })
      .catch(function(err) {
        done(err); // API call failed... 
      });

  };
}
