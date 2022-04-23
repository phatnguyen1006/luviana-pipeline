import { config } from "dotenv";
config();

class documentsController {
    // [GET]: Documentation
    showDocumentation(req, res, next) {
        return res.send(`
            <h2 style="color: #3293a8">Documentation</h2>
            <h4>List of data type</h4>
            <ul>
                <li><a style="color: orange" href="/api/v1/examples/name">name</a></li>
                <li><a style="color: orange" href="/api/v1/examples/address">address</a></li>
                <li><a style="color: blue" href="/api/v1/examples/category">category</a></li>
                <li><a style="color: orange" href="/api/v1/examples/location">location</a></li>
            </ul>

            <ul>
                <li><a style="color: orange" href="/api/v1/examples/thumbnail">thumbnail</a></li>

                <ul>
                    <li>src</li>
                    <li>image</li>
                </ul>
                <br />

                <li><a style="color: orange" href="/api/v1/examples/videoUrl">videoUrl</a></li>
                <li><a style="color: orange" href="/api/v1/examples/descriptions">descriptions</a></li>
                <li><a style="color: blue" href="/api/v1/examples/buildYear">buildYear</a></li>
            </ul>

            <ul>
                <li><a style="color: blue" href="/api/v1/examples/rating">rating</a></li>
                <li><a style="color: blue" href="/api/v1/examples/policies">policies</a></li>
                <li><a style="color: blue" href="/api/v1/examples/groupAmenities">groupAmenities</a></li>
            </ul>

            <ul>
                <li><a style="color: orange" href="/api/v1/examples/numRooms">numRooms</a></li>
                <li><a style="color: blue" href="/api/v1/examples/numRestaurants">numRestaurants</a></li>
                <li><a style="color: blue" href="/api/v1/examples/numBars">numBars</a></li>
                <li><a style="color: blue" href="/api/v1/examples/tags">tags</a></li>
            </ul>

            <ul style="list-style-type: hiragana;">
                <li><a style="color: red;" href="/api/v1/examples/rooms"><b>Rooms</b></a></li>
            </ul>

            <br />
            <hr />
            <hr />
            If you wanna see data example for any type.
            <br />
            <br />
            Go to: <a style="color: green" href="/api/v1/examples">BASE_URL/api/v1/examples</a> to see full data examples.
            <br />
            Or: <a style="color: green" href="#">BASE_URL/api/v1/exampples/<strong><em>:type</em></strong></a> to see data examples of that type (Just fill types in list above).

            <hr />
            To provide data from url. Go to secret page: <a style="color: #0a2e40" href="/api/v1/pipeline/apartment">BASE_URL/api/v1/pipeline</a>

            <hr />
            <p> <h4 style="color: #326fa8; padding-bottom: 0px; margin-bottom: 0;">@deprecated</h5>
            Or provide rooms_details data from apartment's url. Go to secret page: <a style="color: gray" href="#">BASE_URL/api/v1/pipeline/rooms_detail</a></p>

            <hr />
            <h4><a href="#">Run scripts to clear trash data in database.</a></h4>
            <p>This script will delete the room datas which isn't matched to any apartment.</p>
        `);
    }
}

export default new documentsController();
