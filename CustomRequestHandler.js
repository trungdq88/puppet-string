module.exports = class CustomRequestHandler {
  constructor(handler) {
    this.handler = handler;
  }

  processRequest(request) {
    return this.handler(request);
  }
};
