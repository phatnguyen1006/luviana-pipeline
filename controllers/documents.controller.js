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
            <hr />
            If you wanna see data example for any type.
            <br />
            <br />
            Go to: <a href="/api/v1/examples">BASE_URL/api/v1/examples</a> to see full data examples.
            <br />
            Or: <a>BASE_URL/api/v1/exampples/:type</a> to see data examples of that type (Just fill types in list above).

            <hr />
            To provide data from url. Go to secret page: <a href="/api/v1/pipeline/apartment">BASE_URL/api/v1/pipeline</a>
        `);
    }
}

export default new documentsController();
