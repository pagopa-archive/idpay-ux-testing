const settingsParser = require('../conf/settingsParser');

const MILLISECOND_IN_SECONDS = 1000;
jest.setTimeout(70 * MILLISECOND_IN_SECONDS)

let settings;
let secrets;
let url;

describe('Login on QuotesToScrape', () => {
    beforeAll(async () => {
        [settings, secrets] = settingsParser.parseSettings()
        url = settings.BASE_URL;
        await page.goto(url)
      });
      
    test('Successful login on QuotesToScrape', async () => {
        await page.click('a[href="/login"]')
        await page.type("#username", secrets.username)
        await page.type("#password", secrets.password)
        await page.click(".btn.btn-primary")
        await page.waitForSelector('.container > .row > .col-md-4 > p > a')
        const logoutText = await page.evaluate(() => {
          const logoutTag = document.querySelectorAll('a[href="/logout"]');
          return logoutTag[0].innerText
        });
        expect(logoutText).toBe("Logout");
    });
})
