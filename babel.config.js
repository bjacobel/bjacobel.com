module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: false,
        corejs: 3,
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-react',
  ],
};
