const CustomRequestHandler = require('./CustomRequestHandler.js');
const HtmlDocRequestHandler = require('./HtmlDocRequestHandler.js');

it('should be instanceof CustomRequestHandler', () => {
  expect(new HtmlDocRequestHandler()).toBeInstanceOf(CustomRequestHandler);
});
