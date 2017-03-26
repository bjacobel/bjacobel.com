import urlFor from './urlFor';

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

