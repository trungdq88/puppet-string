module.exports = class RequestResolver {
  constructor({ requestMatcher, origin }) {
    this.requestMatcher = requestMatcher;
    this.commonHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'authorization,content-type',
      contentType: 'application/json',
    };
  }

  processResponse(response) {
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

    const response = this.requestMatcher.match(request);
    if (response) {
      return request.respond(this.processResponse(response));
    }
    return request.continue();
  }
};
