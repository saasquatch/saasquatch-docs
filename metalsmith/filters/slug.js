import slug from 'slug';

/**
 * Convert a variable's to a URL-friendly slug
 *
 * @example
 * {{ foo|slug }}
 * // => i-love-unicode 
 *
 * @param  {string} input
 * @return {string} slugified
 */
export default function (input) {
  return slug(input);
};

// module.exports.safe = true;