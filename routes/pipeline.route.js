import express from "express";

const router = express.Router();

import pipelineController from "../controllers/pipeline.controller.js";
import __mytour_analytics from "../functions/analytics.js";

router.get("/pipeline/apartment", (req, res) => res.render("fetching"));
router.post("/pipeline/apartment", __mytour_analytics);

export default router;