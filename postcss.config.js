module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    require('postcss-preset-env')({
      stage: 1
    })
  ]
}
