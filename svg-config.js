module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          inlineStyles: {
            onlyMatchedOnce: false,
            mergePaths: false,
          },

          // or disable plugins
          removeDoctype: false,
        },
      },
    },
  ],
};