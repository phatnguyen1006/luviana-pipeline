import express from "express";
const app = express();



// connect Database

// Library

// .env

// template engine
app.set('view engine', 'pug'); //install pug as view
app.set('views', './views'); // view 

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

