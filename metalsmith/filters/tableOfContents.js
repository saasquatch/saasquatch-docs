import cheerio from 'cheerio';
import slug from 'slug';

/**
 * Convert a variable's contents from Markdown to HTML.
 *
 * @example
 * {{ foo|markdown }}
 * // => <h1>Markdown</h1>
 *
 * @param  {string} input
 * @return {string}       HTML
 */
export default function (input) {

    var $ = cheerio.load(input);
    
    var headings = [];
    $('h1,h2,h3,h3').each(function(){
        var text = $(this).text();
        var id = slug(text.toLowerCase());
        $(this).attr('id', id);
        headings.push({
            text: text,
            id: id
        });
    });
    // console.log("Generated headings", headings);
    
    return {
        content: $.html(),
        headings: headings
    };
};

export var safe = true;