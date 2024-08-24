import webpack from '@cypress/webpack-preprocessor';

export const filePreprocessor = (on: any) => {
  const options = {
    webpackOptions: require('../webpack.cypress.config.js'),
    watchOptions: {},
  };

  on('file:preprocessor', webpack(options));
};