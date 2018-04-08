const serve = require('serve');
const RequestResolver = require('./RequestResolver.js');
const UrlHeaderRequestMatcher = require('./UrlHeaderRequestMatcher.js');

module.exports = class AppServer {
  constructor({
    debug = false,
    devServerPort,
    serverPort = 7777,
    buildPath = './build',
  } = {}) {
    this.debug = debug;
    this.serverPort = serverPort;
    this.host = `http://localhost:${debug ? devServerPort : serverPort}`;
    this.buildPath = buildPath;
    this.server = null;
  }

  async goto(page, path, options = { waitUntil: ['load', 'networkidle0'] }) {
    const prefix = `${this.host}/#`;
    await page.goto(`${prefix}${path}`, options);
  }

  async openPage(path, options) {
    const page = await global.__BROWSER__.newPage();
    await this.goto(page, path, options);
    return page;
  }

  async createPageWithMock(scenario) {
    const page = await global.__BROWSER__.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
      const resolver = new RequestResolver({
        requestMatcher: new UrlHeaderRequestMatcher(scenario),
        origin: this.host,
      });
      return resolver.resolve(request);
    });
    page.open = (path, options) => this.goto(page, path, options);
    return page;
  }

  start() {
    if (this.debug) return;
    this.server = serve(this.buildPath, {
      port: this.serverPort,
    });
    return this.server;
  }

  stop() {
    if (this.debug) return;
    this.server && this.server.stop();
  }
};
