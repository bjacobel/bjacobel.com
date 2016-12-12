const urlFor = (postFilename) => {
  const [_, year, month, day, slug] = postFilename.match(/\.\/(\d\d\d\d)-(\d\d)-(\d\d)-([\w-]+)\.md/);  // eslint-disable-line no-unused-vars, max-len
  return `/${year}/${month}/${day}/${slug}/`;
};

const requireAll = (requireContext) => {
  return requireContext.keys().map(filename => Object.assign({}, requireContext(filename), { filename }));
};

export const posts = () => {
  return requireAll(require.context('../posts/', true, /\.md$/))
    .map(x => Object.assign({}, x, { url: urlFor(x.filename) }));
};

export const work = () => {
  return requireAll(require.context('../data/work/', true, /\.md$/)).reverse();
};

export const projects = () => {
  return requireAll(require.context('../data/projects/', true, /\.md$/)).reverse();
};

