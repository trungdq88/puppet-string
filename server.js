const AppServer = require('./AppServer.js');
const isDebug = !!process.env.DEBUG;
module.exports = new AppServer({
  debug: isDebug,
  devServerPort: 7711,
});
