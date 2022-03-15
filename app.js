import express from "express";
const app = express();

// connect Database

// Library
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

// import
import route from "./routes/index.js";

// .env
import { config } from "dotenv";
config();

const PORT = process.env.PORT;

// template engine
app.set("view engine", "pug"); //install pug as view
app.set("views", "./views"); // view

// app
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIMEOUT) || 60000000 },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes init  
route(app);

app.listen(PORT, () => {
    console.log(`App listening at port:${PORT}`);
});