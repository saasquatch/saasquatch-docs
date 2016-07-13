var path = require('path');

var extname = path.extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

var categories = {
    guide: 'developerCenter',
    jsReference: 'developerCenter',
    apiReference: 'developerCenter',
    mobile: 'developerCenter',
    
    themes: 'designerCenter',

    faq: 'successCenter',
    successArticle: 'successCenter'
};

var allCategories = {
  'developerCenter':true,
  'designerCenter':true,
  'successCenter':true,
  "landingPage": true,
  "error": true,
  "search": true
};

var ignore = ['robots.txt'];

/**
 * Metalsmith plugin that assigns categories based upon section type
 */
function plugin(options){

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      // if (!html(file)) return;
      if (!isProcessable(file, files[file])) return;
      
      var data = files[file];
      if(data['category']){
          if(!allCategories[data['category']]){
            throw new Error("File metadata has invalid `category` property: " + data['category'] + " on file: " + file);
          }
          return; // Category already defined
      }

      var category;
      if (!data['sectionType']){
          throw new Error("File metadata is missing `sectionType` property on file " + file );
      }else{
          var sectionType = data['sectionType'];
          category = categories[sectionType];
          if(!category){
              throw new Error("File metadata has invalid `sectionType` property: " + data['sectionType'] + " on file: " + file);
          }
      }
      // Assigned the
      data['category'] = category;
    });

  };
}

// /**
// * Check whether a file is an HTML file.
// *
// * @param {String} path
// * @return {Boolean}
// */

// function html(path){
//   return /.html/.test(extname(path));
// }

function isProcessable(file, data){
  if(ignore.indexOf(file) > -1){
    return false;
  }
  if(data['template'] || data['permalinks']){
    return true;
  }
  return false;
}