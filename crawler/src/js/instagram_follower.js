const puppeteer = require('puppeteer');
const path = require('path');
const dotenv = require('dotenv');

const instagram_url = 'https://www.instagram.com/accounts/login/';
const root_path = path.join(__dirname, '../../');
const env_path = path.join(root_path, '.env');
let env = dotenv.config({path: env_path});

async function instagram_follower_crawler(id, password) {
    try {
        console.log('root_path : '+ root_path);
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless : false,
            args: ["--window-size=1920,1080", "--disable-notifications"],
            devtools: true,
        });

        const page = await browser.newPage();
        page.setViewport({
            width: 1080,
            height: 1080,
          });
        await page.goto(instagram_url);
        await page.waitForSelector('input[name="username"]');
        
        await page.focus('input[name="username"]');
        await page.keyboard.type(id);
        
        await page.focus('input[name="password"]');
        await page.keyboard.type(password);

        await page.click('button[type="submit"]');
        
        await page.waitForResponse(
            response => response.url() === 'https://www.instagram.com/accounts/onetap/?next=%2F' && 
                        response.status() === 200
        );
        await page.focus('button[class=".yWX7d"]');
        console.log('0');
        //await page.click('button[class="sqdOP.yWX7d.y3zKF"]');
        console.log('1')

        await document.querySelector(".sqdOP.yWX7d.y3zKF").click();
        console.log('2')


        console.log('test');
        await page.waitForResponse(
            response => 
                response.url() === 'https://www.instagram.com/' &&
                response.status() === 200);
        console.log('test1');

        
        

    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    instagram_follower_crawler
}

instagram_follower_crawler(env.parsed.INSTA_ID,env.parsed.INSTA_PW);
