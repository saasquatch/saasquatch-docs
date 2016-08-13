var contents = require('fs').readFileSync('./src/saasquatch-api.yaml');
try{
    
    require('js-yaml').safeLoad(contents);
}catch(e){
    console.log(Object.keys(e))
    console.log(e.name);
    // console.log(e.reason);
    // console.log(e.mark);
    console.log(e.message);
}