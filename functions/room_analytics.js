import request from "request";
import * as cheerio from "cheerio";

const __mytour_room_analytics = async (req, res) => {
    if (!req.body.url) return;

    // data

    // request start
    request(req.body.url, async function (error, responsive, body) {
        if (error) {
            console.log(error);
            res.status(200).json({
                "message": error
            });
        }

        // console.log(req.body.url)
        const $ = cheerio.load(body, {
            xml: true,
            xmlMode: true,
            recognizeCDATA: true,
            scriptingEnabled: true,
        });
        var html = $(body).find("div#rooms_detail");

        // analytics
        const scriptData = html[0];
        // const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

        console.log("node-1: ", html[0]["children"][0]["children"]);

        // res.status(200).json({
        //     // apartment
        //     "address": __NEXT_DATA__.address,
        //     "type": __NEXT_DATA__.category?.code,
        //     "descriptions": __NEXT_DATA__.descriptions,
        //     "rating": __NEXT_DATA__.rating,
        //     // room
        //     "thumbnail": __NEXT_DATA__.thumbnail,
        // });

        res.status(200).json({
            data: JSON.stringify(html)
        });

        // res.status(200).json(__NEXT_DATA__.address);
    });
}

export default __mytour_room_analytics;