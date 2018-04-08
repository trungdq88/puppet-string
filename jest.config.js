const path = require('path');

module.exports = {
  globalSetup: path.resolve(__dirname, 'setup.js'),
  globalTeardown: path.resolve(__dirname, './teardown.js'),
  testEnvironment: path.resolve(__dirname, './PuppeteerEnvironment.js'),
};
