import express from "express";

const router = express.Router();

import examplesController from "../controllers/examples.controller.js";

router.get("/", examplesController.showDataExample);
router.get("/images", examplesController.showImagesExample);
router.get("/:type", examplesController.showExampleByType);

export default router;