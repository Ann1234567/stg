export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,  // 1rem = 16px
      propList: ['*'],
      selectorBlackList: ['.norem'],
      unitPrecision: 5,
      mediaQuery: false,
      minPixelValue: 1,
      exclude: /node_modules\/(?!vant)/i
    },
    tailwindcss: {},
    autoprefixer: {}
  }
}