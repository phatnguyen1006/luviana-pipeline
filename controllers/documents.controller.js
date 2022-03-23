import express from "express";
import request from "request";
import * as cheerio from "cheerio";
import { config } from "dotenv";
config();

class documentsController {
    // [GET]: Documentation
    showDocumentation(req, res, next) {
        return res.send(`
            <h2>Documentation</h2>
            <h4>List of data type</h4>
            <ul>
                <li>address</li>
                <li>thumb</li>
                <li>video</li>
                <li>descriptions</li>
                <li>location</li>
            </ul>

            <br />
            <br />
            If you wanna see data example for any type.
            <br />
            Go to: <a href="/api/v1/examples">BASE_URL/api/v1/examples</a> to see full data examples.
            Or: url/exampples/:type to see data examples of that ype (Just fill type in list above).
        `);
    }
}

export default new documentsController();
