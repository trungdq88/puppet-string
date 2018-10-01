const { CustomRequestHandler, HtmlDocRequestHandler } = require('./index.js');

it('should export successful', () => {
  expect(CustomRequestHandler).toBeTruthy();
  expect(HtmlDocRequestHandler).toBeTruthy();
});
