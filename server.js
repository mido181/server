const express = require("express");
const app = express();

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const likesRoute = require("./routes/likeRoute");
const cookieParser = require("cookie-parser");
const globalErrorHandle = require('./middlewares/globalErrorhandleMiddleware');
// const fs = require("fs");
const cors = require("cors");
const path = require("path");
const verifyToken = require("./middlewares/authMiddleware");
const uploadRoute = require("./routes/uploadRoute");

app.use(
  "/public/images/users",
  express.static(path.join(__dirname, "public/images/users"))
);

// Or configure specific options

// app.all("*", cors()); // Enable preflight for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", ["Content-Type, Authorization"]);
  res.header("Access-Control-Allow-Credentials", "true");
  if ("OPTIONS" == req.method) res.send(200);
  else next();
});
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
// test api
app.get("/", (req, res) => {
  res.send("hello");
});
// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/like", likesRoute);
// verifyToken
app.use(globalErrorHandle);

module.exports = app;
