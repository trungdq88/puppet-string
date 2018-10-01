const CustomRequestHandler = require('./CustomRequestHandler.js');

module.exports = class HtmlDocRequestHandler extends CustomRequestHandler {
  processRequest(request, commonHeaders) {
    const response = this.handler(request);
    return Object.assign({}, response, {
      headers: Object.assign({}, response.headers, commonHeaders, {
        'Content-Type': 'text/html',
      }),
    });
  }
};
