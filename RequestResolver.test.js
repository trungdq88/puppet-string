const RequestResolver = require('./RequestResolver.js');
const CustomRequestHandler = require('./CustomRequestHandler.js');

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
    match: () => new CustomRequestHandler(() => mockResponse),
  };
  const responder = jest.fn();
  const mockRequest = { method: () => 'GET', respond: responder };
  const resolver = new RequestResolver({ requestMatcher: mockRequestMatcher });
  resolver.resolve(mockRequest);
  expect(responder).toBeCalledWith(mockResponse);
});
