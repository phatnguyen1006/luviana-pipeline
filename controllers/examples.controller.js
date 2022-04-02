import request from "request";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { config } from "dotenv";
config();

class examplesController {
  // [GET] /pipeline

  // [GET] /examples/images
  async showImagesExample(req, res, next) {
    const url = process.env.EXAMPLES_URL ?? "";

    if (!url) return;

    // data

    // request start
    request(url, async function (error, responsive, body) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: error,
        });
      }

      // console.log(req.body.url)
      const $ = cheerio.load(body, {
        // xml: true,
        xmlMode: true,
        recognizeCDATA: true,
        scriptingEnabled: true,
      });
      var html = $(body).find("script#__NEXT_DATA__");

      // analytics
      const scriptData = html[0].children[0]["data"];
      const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

      console.log("node-1: ", __NEXT_DATA__ ? true : false);

      res.status(200).json({
        // "address": __NEXT_DATA__.address,
        // "thumb": __NEXT_DATA__.thumbnail,
        // "video": __NEXT_DATA__.videoUrl,
        // "descriptions": __NEXT_DATA__.descriptions,
        // "location": __NEXT_DATA__.location,
        image: __NEXT_DATA__.images,
      });

      // res.status(200).json(__NEXT_DATA__.address);
    });
  }

  // [GET] /examples/
  async showDataExample(req, res, next) {
    const url = process.env.EXAMPLES_URL ?? "";

    if (!url) return;

    // data

    // request start
    request(url, async function (error, responsive, body) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: error,
        });
      }

      // console.log(req.body.url)
      const $ = cheerio.load(body, {
        // xml: true,
        xmlMode: true,
        recognizeCDATA: true,
        scriptingEnabled: true,
      });
      var html = $(body).find("script#__NEXT_DATA__");

      // analytics
      const scriptData = html[0].children[0]["data"];
      const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

      console.log("node-1: ", __NEXT_DATA__ ? true : false);

      res.status(200).json({
        data: __NEXT_DATA__,
      });

      // res.status(200).json(__NEXT_DATA__.address);
    });
  }

  // [GET] /examples/:specify
  async showExampleByType(req, res, next) {
    /** @type {req: request} */

    if (!req.params.type) return res.send("Pls provide the type after the url");
    const example = req.params.type;

    const url = process.env.EXAMPLES_URL ?? "";

    if (!url) return;

    // data

    // request start
    request(url, async function (error, responsive, body) {
      if (error) {
        console.log(error);
        res.status(200).json({
          message: error,
        });
      }

      // console.log(req.body.url)
      const $ = cheerio.load(body, {
        // xml: true,
        xmlMode: true,
        recognizeCDATA: true,
        scriptingEnabled: true,
      });
      var html = $(body).find("script#__NEXT_DATA__");

      // analytics
      const scriptData = html[0].children[0]["data"];
      const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

      console.log("node-1: ", __NEXT_DATA__ ? true : false);

      let obj = {};
      obj[example] =
        example === "descriptions"
          ? __NEXT_DATA__[`${example}`].replace(/\n|<br>/g, "<br/>")
          : __NEXT_DATA__[`${example}`];

      res.status(200).json(obj);
    });
  }

  async showExampleRooms(req, res) {
    const qurl = process.env.EXAMPLES_URL ?? "";

    if (!qurl) return;


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
    // await page.waitFor(2000);

    let title = await page.evaluate(() => {
      let header = document.querySelector("div#rooms_detail");
      if (header === null) {
        header = document.querySelector("div#rooms_detail");
      }
      return header.innerHTML;
    });

    // console.log("Page ID Spawned", title);
    // return page;

    // const bot1 = `<svg width="16" height="16" fill="none"><path d="M2 14v-1.333A2.667 2.667 0 014.667 10h2.666A2.667 2.667 0 0110 12.667V14m.667-11.913a2.667 2.667 0 010 5.166M14 14v-1.333a2.667 2.667 0 00-2-2.567M8.667 4.667a2.667 2.667 0 11-5.334 0 2.667 2.667 0 015.334 0z" stroke="#4A5568" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    const bot2 = "Xem hình ảnh &amp; tiện nghi";

    title = title.split(bot2).slice(1);

    const checkArr = title.length;

    // split từ thẻ /div số 2
    const __room_data = title.map((r) => {
      const stepZero = r;
      const stepOne = stepZero.split("</div>"); // chưa map data => chọn title 2 để test

      // tên √
      const foundName = stepOne[1].split(">").pop();
      // sức chưa capacity √
      const foundCapacity = stepOne
        .slice(2)[0]
        .split("</span>")[1]
        .split(">")
        .pop();
      // diện tích stretch √
      const foundStretch = stepOne
        .slice(2)
        .slice(1)[0]
        .split("m2")[0]
        .split(">")
        .pop();
      // price √
      const foundPrice =
        stepOne
          ?.filter((s) => s.includes("/ phòng / đêm"))[0]
          ?.replace("/ phòng / đêm", "")
          ?.split("đ")[0]
          ?.split(">")
          ?.pop()
          ?.split(".")
          ?.join("") ?? "unknown";

      // số giường X
      const foundBedCount = r.split("giường")[0].trim().split(">").pop();
      const foundBedType = r.split("giường")[1].trim().split("<").shift();
      const foundBed = foundBedCount + " " + foundBedType;

        return {
          name: foundName,
          capacity: foundCapacity,
          stretch: foundStretch,
          bed: foundBed,
          price: parseInt(foundPrice),
        };

    });

    // const roomData = {
    //   id: res.locals.apartmentID ?? null,
    //   price: ,
    //   description: ,
    //   capacity: ,
    //   rating: ,
    //   thumbnail: ,
    //   pictures: ,
    //   isAvailable: true,
    // }

    // const newRooms = await RoomServices.addNewRoom()

    // console.log("picking up: ", page);
    return res.status(200).json({
        length: checkArr,
        data: __room_data
    });
    // return res.send(title);
  }
}

export default new examplesController();
