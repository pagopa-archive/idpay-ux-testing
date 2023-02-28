const settingsParser = require('../conf/settingsParser');

const MILLISECOND_IN_SECONDS = 1000;
jest.setTimeout(60 * MILLISECOND_IN_SECONDS)

let settings;
let secrets;
let url;

describe('Login on SelfCare', () => {
    beforeAll(async () => {
        [settings, secrets] = settingsParser.parseSettings()
        url = settings.SELFCARE_URL;
        await page.goto(url)

        // Reject cookies
        await page.waitForSelector('#onetrust-reject-all-handler')
        await page.click('#onetrust-reject-all-handler')

        // Login with test identity provider
        await page.waitForSelector('#spidButton')
        await page.evaluate(() => {
            document.querySelector('#spidButton').click();
        });

        await page.waitForSelector('.MuiGrid-root > .MuiGrid-root:nth-child(11) > .MuiButton-root > .material-icons > img')
        await page.evaluate(() => {
            document.querySelector('.MuiGrid-root > .MuiGrid-root:nth-child(11) > .MuiButton-root > .material-icons > img').click();
        });

        // Insert credential
        await page.waitForSelector('#username')
        await page.type('#username', secrets.selfcare.username)

        await page.waitForSelector('#password')
        await page.type('#password', secrets.selfcare.password)

        // Accept data threatment
        await page.waitForSelector('.main > .main-bodytext > .Form > .FixedSmall > .u-padding-all-s:nth-child(1)')
        await page.evaluate(() => {
            document.querySelector('.main > .main-bodytext > .Form > .FixedSmall > .u-padding-all-s:nth-child(1)').click();
        });
        await page.waitForSelector('.main > .main-bodytext > form > .FixedSmall > .u-padding-all-s:nth-child(2)')
        await page.evaluate(() => {
            document.querySelector('.main > .main-bodytext > form > .FixedSmall > .u-padding-all-s:nth-child(2)').click();
        });

        // Find test Ente in the list
        await page.waitForSelector('.MuiBox-root > .MuiGrid-root > .MuiGrid-root > .MuiPaper-root > .MuiGrid-root')

        const entiTags = await page.evaluate(() => {
            const elements = document.querySelectorAll('[data-testid]');
            return Array.from(elements).map(el => el.textContent);
        });

        let i = 0;
        let j = 0;
        entiTags.forEach((tag)=>{
                if (tag.startsWith(settings.ENTE_DI_TEST)){
                    j= i
                }
                i++
            }
        )

        const enti = await page.$$('[data-testid]');

        // Login with the test one
        await enti[j].click();
        await page.click('.MuiBox-root > .MuiGrid-root > .MuiGrid-root > .css-ld1zcw > .MuiButton-root');

    });
      
    test('Successful login on SelfCare', async () => {
        const currentEnteLogged = await page.evaluate(() => {
            const loggedEnte = document.querySelector('.css-1wreeyw > .MuiBox-root > .MuiBox-root > .MuiBox-root > .MuiTypography-body1');
            return loggedEnte.innerText
        });
        expect(currentEnteLogged).toBe(settings.ENTE_DI_TEST);

    });
})
