import request from "request";
import * as cheerio from "cheerio";
import * as http from "http";
import puppeteer from "puppeteer";

const __mytour_room_analytics = async (req, res) => {
  if (!req.body.url) return;

  const qurl = req.body.url;

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
  });
  const page = await browser.newPage();

  console.log("Navigate to ... ", qurl);

  // await page.goto(qurl);

  // wait

  await page.goto(qurl, {
    // Set timeout cho page
    timeout: 3000000,
  });
  // Chờ 2s sau khi page được load để tránh overload
  await page.waitFor(2000);

  let title = await page.evaluate(() => {
    let header = document.querySelector("div#rooms_detail");
    if (header === null) {
      header = document.querySelector("div#rooms_detail");
    }
    return header.innerHTML;
  });

  console.log("Page ID Spawned", title);
  // return page;

  // console.log("picking up: ", page);
  //   return res.send(title);
  return res.status(200).json({ data: title });
};

export default __mytour_room_analytics;
