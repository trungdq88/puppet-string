module.exports = class CustomRequestHandler {
  constructor(handler) {
    this.handler = handler;
  }

  processRequest(request, commonHeaders) {
    return this.handler(request, commonHeaders);
  }
};
