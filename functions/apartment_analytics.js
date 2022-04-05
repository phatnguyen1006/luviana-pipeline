import request from "request";
import * as cheerio from "cheerio";

import { ApartmentService } from "../services/apartment.services.js";
import { getRandomIntInclusive } from "../helpers/random.js";

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
      street: __NEXT_DATA__?.address?.streetName ?? "unknown",
      district: __NEXT_DATA__?.address?.districtName ?? "unknown",
      province: __NEXT_DATA__?.address?.provinceName ?? "unknown",
      country: __NEXT_DATA__?.address?.country ?? "unknown",
    };
    const _descriptions =
      __NEXT_DATA__.descriptions?.replace(/\n|<br>/g, "<br/>") ?? "unknown";

    const _thumbnail = __NEXT_DATA__.thumbnail.src;
    const _pictures = __NEXT_DATA__.images.map((i) => i.src);

    try {
      // address, name, type, rating, description, thumbnail, pictures
      const newApartment = await ApartmentService.addNewApartment(
        _address,
        __NEXT_DATA__.name,
        __NEXT_DATA__.category?.code,
        getRandomIntInclusive(3,5),
        _descriptions,
        _thumbnail,
        _pictures
      );

      if (newApartment.success) {
        // if (true) {
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
        res.locals.apartmentID = newApartment.data?._id ?? null;
        next();
      } else {
        return res.render("fetching", {
          status: 400,
          error: "Bad request",
        });
      }
    } catch (error) {
      return res.render("fetching", {
        status: 500,
        error: `Cant create new room. Data pipeline is failed with error: ${error}`,
      });
    }
  });
};

export default __mytour_apartment_analytics;
