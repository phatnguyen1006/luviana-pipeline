import express from "express";

const router = express.Router();

import pipelineController from "../controllers/pipeline.controller.js";

router.get("/pipeline/apratment", pipelineController.fetchApartment);
router.get("/pipeline/room", pipelineController.fetchRoomOfApartment);

export default router;