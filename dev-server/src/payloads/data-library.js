const data = require('./data-collections');

const library = {
  count_collections: 2,
  count_pages: 247,
  count_lines: 3422,
  collections: [...data.collection]
};

module.exports = {
  library
};
