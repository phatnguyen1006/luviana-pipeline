import request from "request";
import * as cheerio from "cheerio";
import * as http from "http";
import puppeteer from "puppeteer";

import { RoomServices } from "../services/room.services.js";

const __mytour_room_analytics = async (req, res) => {
  if (!res.locals.url || !res.locals.apartmentID)
    return res.status(400).json({
      error: "Cant create new room. Please check apartmentID or url.",
    });

  const qurl = res.locals.url;

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
  const __room_data = title.map(async (r) => {
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

    console.log(typeof(res.locals.apartmentID));

    const newRoom = await RoomServices.addNewRoom({
      apartmentId: res.locals.apartmentID,
      price: parseInt(foundPrice),
      description: "This is description",
      capacity: 2,
      rating: 4,
      thumbnail: "123",    // update
      pictures: ["123"],  // update
      isAvailable: true,
    });

    if (newRoom) {

      return newRoom.data;

      // return {
      //   name: foundName,
      //   capacity: foundCapacity,
      //   stretch: foundStretch,
      //   bed: foundBed,
      //   price: parseInt(foundPrice),
      // };
    } else {
      return res.status(400).json({
        error: "Cant create new room. Data pipeline is failed",
      });
    }
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
  Promise.all([__room_data])
    .then((p) =>
      res.status(200).json({
        message: "Add new instance successfully."
      })
    )
    .catch((error) => {
      throw `Failed to create room with error: ${error}`;
    });
  // return res.send(title);
};

export default __mytour_room_analytics;
