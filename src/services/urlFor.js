// Needs to be a CommonJS export so Node can use this file, as well as Webpack
module.exports = (postFilename) => {
  const [_, year, month, day, slug] = postFilename.match(/\.\/(\d\d\d\d)-(\d\d)-(\d\d)-([\w-]+)\.md/);  // eslint-disable-line no-unused-vars, max-len
  return `/${year}/${month}/${day}/${slug}/`;
};
