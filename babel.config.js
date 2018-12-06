module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: api.env('test') ? 'commonjs' : false,
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-react',
  ],
});
