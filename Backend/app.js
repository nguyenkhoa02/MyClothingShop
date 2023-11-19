const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');


const itemsRoute = require("./app/routers/item.route");
const categoryRoute = require("./app/routers/category.route");
const authRouter = require('./app/routers/auth.route')
const userRouter = require('./app/routers/user.route');
require("dotenv").config();

const ApiError = require("./app/api-error");

const app = express()

app.use(bodyParser.urlencoded({
    extended: false,
}),);
app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "wellcome"});
})

app.use("/api/items", itemsRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/authentication", authRouter);
app.use("/api/user", userRouter);


app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});


module.exports = app;