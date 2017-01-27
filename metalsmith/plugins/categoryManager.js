import path from 'path';

var extname = path.extname;

/**
 * Expose `plugin`.
 */

export default plugin;

var sectionsToCategories = {
    guide: 'developerCenter',
    jsReference: 'developerCenter',
    apiReference: 'developerCenter',
    mobile: 'developerCenter',
    
    designerArticle: 'designerCenter',
    themes: 'designerCenter',

    faq: 'successCenter',
    successArticle: 'successCenter'
};

var categoriesToNames = {
  'developerCenter': "Developer Center",
  'designerCenter': "Designer Center",
  'successCenter':"Success Center",
  "landingPage": "Help Center",
  "error": "Help Center",
  "search": "Help Center"
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
          if(!categoriesToNames[data['category']]){
            throw new Error("File metadata has invalid `category` property: " + data['category'] + " on file: " + file);
          }
          data['categoryName'] = categoriesToNames[data['category']];
          return; // Category already defined
      }

      var category;
      if (!data['sectionType']){
          throw new Error("File metadata is missing `sectionType` property on file " + file );
      }else{
          var sectionType = data['sectionType'];
          category = sectionsToCategories[sectionType];
          if(!category){
              throw new Error("File metadata has invalid `sectionType` property: " + data['sectionType'] + " on file: " + file);
          }
      }
      // Assigned the
      data['category'] = category;
      data['categoryName'] = categoriesToNames[category];
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