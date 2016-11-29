import path from 'path';

export default function pathToUrl() {
  // Normalizes Windows file paths to valid url paths
  return path.join.apply(this, arguments).replace(/\\/g, '/')
};
