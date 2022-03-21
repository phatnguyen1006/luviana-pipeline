import request from "request";
import * as cheerio from "cheerio";

const __mytour_analytics = async (req, res) => {
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
            // xml: true,
            xmlMode: true,
            recognizeCDATA: true,
            scriptingEnabled: true,
        });
        var html = $(body).find("script#__NEXT_DATA__");

        // analytics
        console.log("node-1: ", html);
    
        res.status(200).json({ "data": html.toString() });
    });
}

export default __mytour_analytics;