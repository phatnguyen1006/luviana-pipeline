import express from "express";

const router = express.Router();

import documentsController from "../controllers/documents.controller.js";

router.get("/", documentsController.showDocumentation);

export default router;