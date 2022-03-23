import pipeline from "./pipeline.route.js";
import examples from "./examples.route.js";
import document from "./documents.route.js";

function route(app) {

    app.get("/", (req, res) => res.redirect("/api/v1/documents"));
    app.get("/api/v1/", (req, res) => res.redirect("/api/v1/documents"));

    app.use("/api/v1/documents", document);
    app.use("/api/v1/examples", examples);
    app.use("/api/v1/pipeline", pipeline);
}

export default route;