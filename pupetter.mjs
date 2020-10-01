

import puppeteer from 'puppeteer';

const CYBOU_URL = 'https://your.cybouz.host.com/cgi-bin/cbag/ag.cgi' // URL of Cybouz

const BASIC_USERNAME = 'basicUserName'; // set username for basic auth if it has
const BASIC_PASSWORD = 'basicPassword'; // set password for basic auth if it has

const LOGIN_USER_INDEX = '1234'; // value of option for your user
const LOGIN_USER_PASS = 'foobar'; // your login password




async function login(page, url){
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${new Buffer.from(`${BASIC_USERNAME}:${BASIC_PASSWORD}`).toString('base64')}`
  });
  await page.goto(url,{waitUntil: "domcontentloaded"}) // ページへ移動

  // 任意のJavaScriptを実行
  await page.select('select[name="_ID"]', LOGIN_USER_INDEX)
  await page.type('input[name="Password"]', LOGIN_USER_PASS)
  return await page.evaluate(() => $('form').submit())
}

async function asyncMap(array, operation) {
  return Promise.all(array.map(async item => await operation(item)))
}

async function checkRingis(page,url){
  return new Promise(async (resolve, reject) => {
    console.log('working with ' + url)
    await page.goto(url)
    await page.waitFor(3000)
    await page.click('input[class="vr_stdButton"]');
    await page.waitFor(3000)
    resolve()
  });
  
}

!(async() => {

  try {
    const browser = await puppeteer.launch(
      {       
        // uncomment this line if you want to see actual behavier
        // headless: false
      }
    );

    const page = await browser.newPage()

    await login(page, CYBOU_URL + '?Page=&Group=5907')
    console.log('logged in successfully')
    await page.waitFor(3000)
    await page.goto(CYBOU_URL + '?page=WorkFlowIndex') 
    console.log('moving to WorkFlowIndex')
    await page.waitFor(3000)
    let elm = await page.$(".dataList")

    let alist = await elm.$$('a',elem => elem.innerText)

    const urls = await asyncMap(alist, async (v) => {
      return await (await v.getProperty('href')).jsonValue();
    });

    for(let url of urls) {
      await  checkRingis(page,url);
    }

    // ブラウザを閉じる
    browser.close()
  } catch(e) {
    console.error(e)
  }
})()