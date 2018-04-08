const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const teardown = require('./teardown.js');
const appServer = require('./server.js');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const isDebug = !!process.env.PUPPET_STRING_DEBUG;

module.exports = async function() {
  console.log(chalk.green('Setup Puppeteer'));
  const browser = await puppeteer.launch(
    isDebug
      ? {
          headless: false,
          devtools: true,
        }
      : {},
  );
  global.__BROWSER__ = browser;
  appServer.start();
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
  await new Promise(r => setTimeout(r, 1000));
};
