import pipeline from "./pipeline.route.js";

function route(app) {
    app.use("/api/v1", pipeline);
}

export default route;