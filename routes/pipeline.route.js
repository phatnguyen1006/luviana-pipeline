import express from "express";

const router = express.Router();

import __mytour_apartment_analytics from "../functions/apartment_analytics.js";
import __mytour_room_analytics from "../functions/room_analytics.js";

router.get("/apartment", (req, res) => res.render("fetching"));
// testing
router.post("/apartment", __mytour_room_analytics , __mytour_apartment_analytics);

router.post("/room", __mytour_room_analytics);

export default router;