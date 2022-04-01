import request from "request";
import * as cheerio from "cheerio";

import { ApartmentService } from "../services/apartment.services.js";

const __mytour_apartment_analytics = async (req, res, next) => {
  if (!req.body.url) return;

  // data

  // request start
  request(req.body.url, async function (error, responsive, body) {
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

    // add to database
    // const newApartmentRequest = await addNewApartment(scriptData);

    const _address = {
      apartmentNumber: 1,
      street: __NEXT_DATA__.streetName ?? "unknown",
      district: __NEXT_DATA__.districtName ?? "unknown",
      province: __NEXT_DATA__.provinceName ?? "unknown",
      country: __NEXT_DATA__.country ?? "unknown",
    };
    const _descriptions =
      __NEXT_DATA__.descriptions?.replace(/\n|<br>/g, "<br/>") ?? "unknown";

    // const newApartment = await ApartmentService.addNewApartment(_address, __NEXT_DATA__.name, __NEXT_DATA__.category?.code, 4, _descriptions);

    // next();

    if (newApartment) {
      // res.status(200).json({
      //   /** @type {string: __NEXT_DATA__.descriptions} */
      //   // apartment
      //   name: __NEXT_DATA__.name,
      //   address: __NEXT_DATA__.address,
      //   type: __NEXT_DATA__.category?.code,
      //   descriptions:
      //     __NEXT_DATA__.descriptions?.replace(/\n|<br>/g, "<br/>") ?? "unknown",
      //   rating: __NEXT_DATA__.rating,
      //   // room
      //   thumbnail: __NEXT_DATA__.thumbnail,
      // });

      res.locals.url = req.body.url;
      res.locals.apartmentID = newApartment._id;
      next();
    } else {
      res.status(400).json({ error: "Bad request" });
    }
  });
};

export default __mytour_apartment_analytics;
