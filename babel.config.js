module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: false,
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-react',
  ],
};
