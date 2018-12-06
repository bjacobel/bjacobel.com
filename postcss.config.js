/* eslint-env node */

const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssnano = require('cssnano');

module.exports = ({ env }) => ({
  plugins: [
    precss({
      import: {
        path: ['src/'],
      },
    }),
    autoprefixer,
    env === 'production' && cssnano({
      preset: ['default', { normalizeUrl: false, mergeLonghand: false }],
    }),
  ],
});
