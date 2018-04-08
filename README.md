# Puppet String

I configurated everything about Jest and Puppeteer, so you won't have to.

## Usage

    npm install puppet-string

Add your automation tests:


File `e2e/test-home-page.test.js`:
```js
    const PuppetString = require('puppet-string');
    const browser = PuppetString();

    describe('/ (Home Page)', () => {
      it('should load without error', async () => {
        let page = await browser.openPage('https://google.com')
        let text = await page.evaluate(() => document.body.textContent)
        expect(text).toContain('google')
        await page.close()
      })
    })
```

Run tests:

    npm run puppet-string test

## What it does:
- Handle all the jest <-> puppeteer for you so you can start write automation script right away.
- Automatically handle start/stop app server for automation test
- Be able to mock requests from puppeteer (with customizable request matching logic)

**puppet-string** runs its own version of Jest, it could be different version of create-react-app already used.


TODO: document coming soon
