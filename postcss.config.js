module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Edge versions'
      ]
    }),
    require('stylelint')(),
    require('postcss-reporter')()
  ]
};
