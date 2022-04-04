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
        ?.join("") ?? 400000;

    // số giường X
    const foundBedCount = r.split("giường")[0].trim().split(">").pop();
    const foundBedType = r.split("giường")[1].trim().split("<").shift()?.split("và")[0]?.trim();
    const foundBed = foundBedCount + " " + foundBedType;

    // name: 
    // apartmentId: 
    // price: 
    // bedName: 
    // capacity: 
    // square: 
    // rating: 
    // thumbnail: 
    // isAvailable: 
    // facilities:

    try {
      const newRoom = await RoomServices.addNewRoom({
        apartmentId: res.locals.apartmentID,
        name: foundName,
        price: parseInt(foundPrice),
        bedName: foundBed,
        capacity: foundCapacity,
        square: foundStretch,
        rating: 4,
        thumbnail: "https://media.istockphoto.com/vectors/man-sleeping-on-bed-vector-id1142805287?k=20&m=1142805287&s=612x612&w=0&h=PnEs5WJXlhs6JdiDfu-0pVOTHDIL9h3q4NJHFzKiftk=",    // update
        isAvailable: true
      });
  
      if (newRoom.success) {
  
        return newRoom.data;
  
        // return {
        //   name: foundName,
        //   capacity: foundCapacity,
        //   stretch: foundStretch,
        //   bed: foundBed,
        //   price: parseInt(foundPrice),
        // };
      } else {
        return res.render("fetching", {
          status: 400,
          error: "Cant create new room. Data pipeline is failed"
        });
      }
    } catch (error) {
      return res.render("fetching", {
        status: 500,
        error: `Cant create new room. Data pipeline is failed with error: ${error}`
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

  Promise.all([__room_data])
    .then((_) =>
      res.render("fetching", {
        status: 200,
        message: `Add new instance: { apartment: 1 - rooms: ${checkArr} } successfully.`
      })
    )
    .catch((error) => {
      throw `Failed to create room with error: ${error}`;
    });
  // return res.send(title);
};

export default __mytour_room_analytics;
