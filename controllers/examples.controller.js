import express from "express";
import request from "request";
import * as cheerio from "cheerio";
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
            const scriptData = html[0].children[0]["data"];
            const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

            console.log("node-1: ", __NEXT_DATA__?true:false);

        
            res.status(200).json({
                // "address": __NEXT_DATA__.address,
                // "thumb": __NEXT_DATA__.thumbnail,
                // "video": __NEXT_DATA__.videoUrl,
                // "descriptions": __NEXT_DATA__.descriptions,
                // "location": __NEXT_DATA__.location,
                "image": __NEXT_DATA__.images
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
            const scriptData = html[0].children[0]["data"];
            const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

            console.log("node-1: ", __NEXT_DATA__?true:false);

        
            res.status(200).json({
                "data": __NEXT_DATA__
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
            const scriptData = html[0].children[0]["data"];
            const __NEXT_DATA__ = JSON.parse(scriptData).props.pageProps.hotelDetail;

            console.log("node-1: ", __NEXT_DATA__?true:false);

            let obj = {};
            obj[example] = __NEXT_DATA__[`${example}`];
        
            res.status(200).json(obj);
        });
    }

    
}

export default new examplesController();
