export default (title) => {
  const base = 'Brian Jacobel';

  if (title) {
    document.title = `${title} | ${base}`;
  } else {
    document.title = base;
  }
};
