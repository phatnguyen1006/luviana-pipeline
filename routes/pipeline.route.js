import express from "express";

const router = express.Router();

import __mytour_analytics from "../functions/analytics.js";

router.get("/apartment", (req, res) => res.render("fetching"));
router.post("/apartment", __mytour_analytics);

export default router;