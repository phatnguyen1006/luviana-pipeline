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
                <li><a href="/api/v1/examples/name">name</a></li>
                <li><a href="/api/v1/examples/address">address</a></li>
                <li><a href="/api/v1/examples/category">category</a></li>
                <li><a href="/api/v1/examples/location">location</a></li>
            </ul>

            <ul>
                <li><a href="/api/v1/examples/thumbnail">thumbnail</a></li>

                <ul>
                    <li>src</li>
                    <li>image</li>
                </ul>
                <br />

                <li><a href="/api/v1/examples/videoUrl">videoUrl</a></li>
                <li><a href="/api/v1/examples/descriptions">descriptions</a></li>
                <li><a href="/api/v1/examples/buildYear">buildYear</a></li>
            </ul>

            <ul>
                <li><a href="/api/v1/examples/rating">rating</a></li>
                <li><a href="/api/v1/examples/policies">policies</a></li>
                <li><a href="/api/v1/examples/groupAmenities">groupAmenities</a></li>
            </ul>

            <ul>
                <li><a href="/api/v1/examples/numRooms">numRooms</a></li>
                <li><a href="/api/v1/examples/numRestaurants">numRestaurants</a></li>
                <li><a href="/api/v1/examples/numBars">numBars</a></li>
                <li><a href="/api/v1/examples/tags">tags</a></li>
            </ul>

            <br />
            <hr />
            If you wanna see data example for any type.
            <br />
            <br />
            Go to: <a href="/api/v1/examples">BASE_URL/api/v1/examples</a> to see full data examples.
            <br />
            Or: <a href="#">BASE_URL/api/v1/exampples/<strong><em>:type</em></strong></a> to see data examples of that type (Just fill types in list above).

            <hr />
            To provide data from url. Go to secret page: <a href="/api/v1/pipeline/apartment">BASE_URL/api/v1/pipeline</a>
        `);
    }
}

export default new documentsController();
