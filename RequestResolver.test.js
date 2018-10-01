const RequestResolver = require('./RequestResolver.js');
const CustomRequestHandler = require('./CustomRequestHandler.js');
const HtmlDocRequestHandler = require('./HtmlDocRequestHandler.js');

it('should return json response', () => {
  const testBody = { testBody: 123 };
  const mockRequestMatcher = {
    match: () => ({ body: testBody }),
  };
  const responder = jest.fn();
  const mockRequest = { method: () => 'GET', respond: responder };
  const resolver = new RequestResolver({ requestMatcher: mockRequestMatcher });
  resolver.resolve(mockRequest);
  expect(responder).toBeCalledWith({
    headers: resolver.commonHeaders,
    body: JSON.stringify(testBody),
  });
});

it('should use CustomRequestHandler response', () => {
  const mockResponse = { hello: 123 };
  const mockRequestMatcher = {
    match: () =>
      new CustomRequestHandler((request, commonHeaders) => ({
        ...mockResponse,
        headers: commonHeaders,
      })),
  };
  const responder = jest.fn();
  const mockRequest = { method: () => 'GET', respond: responder };
  const resolver = new RequestResolver({ requestMatcher: mockRequestMatcher });
  resolver.resolve(mockRequest);
  expect(responder).toBeCalledWith({
    ...mockResponse,
    headers: resolver.commonHeaders,
  });
});

it('should use HtmlDocRequestHandler response', () => {
  const mockResponse = {
    body: '<h1>Hello</h1>',
  };
  const mockRequestMatcher = {
    match: () => new HtmlDocRequestHandler(request => mockResponse),
  };
  const responder = jest.fn();
  const mockRequest = { method: () => 'GET', respond: responder };
  const resolver = new RequestResolver({ requestMatcher: mockRequestMatcher });
  resolver.resolve(mockRequest);
  expect(responder).toBeCalledWith({
    ...mockResponse,
    headers: { ...resolver.commonHeaders, 'Content-Type': 'text/html' },
  });
});

it('should not crash on null handler', () => {
  const mockRequestMatcher = {
    match: () => null,
  };
  const responder = jest.fn();
  const mockRequest = { method: () => 'GET', continue: responder };
  const resolver = new RequestResolver({ requestMatcher: mockRequestMatcher });
  resolver.resolve(mockRequest);
  expect(responder).toBeCalledWith();
});
