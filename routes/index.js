import pipeline from "./pipeline.route.js";
import examples from "./examples.route.js";
import document from "./documents.route.js";

function route(app) {
    app.use("/api/v1/documents", document);
    app.use("/api/v1/examples", examples);
    app.use("/api/v1/pipeline", pipeline);
}

export default route;