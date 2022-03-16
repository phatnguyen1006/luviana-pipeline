import express from "express";

class pipelineController {
    // [GET] /pipeline
    
    // [POST] /pipeline/apartment
    fetchApartment(req, res, next) {
        const url = req.body.url ?? "";
        
        if (!url) {
            res.status(200).json({ success: false });
        }
        res.status(200).json({ success: false });
    }
}

export default new pipelineController();
