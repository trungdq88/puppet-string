const CustomRequestHandler = require('./CustomRequestHandler.js');

module.exports = class RequestResolver {
  constructor({ requestMatcher, origin }) {
    this.requestMatcher = requestMatcher;
    this.commonHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'authorization,content-type',
      'Content-Type': 'application/json',
    };
  }

  toJsonResponse(response) {
    return Object.assign({}, response, {
      headers: Object.assign({}, response.headers, this.commonHeaders),
      body: JSON.stringify(response.body),
    });
  }

  resolve(request) {
    if (request.method() === 'OPTIONS') {
      request.respond({
        status: 200,
        headers: this.commonHeaders,
      });
      return;
    }

    const handler = this.requestMatcher.match(request);
    if (handler instanceof CustomRequestHandler) {
      return request.respond(
        handler.processRequest(request, this.commonHeaders),
      );
    } else if (handler) {
      return request.respond(this.toJsonResponse(handler));
    }
    return request.continue();
  }
};
