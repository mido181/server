// const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config.env" });
const morgan = require("morgan");
const DBCon = require("./config/database");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const likesRoute = require("./routes/likeRoute");
const cookieParser = require("cookie-parser");
// const fs = require("fs");
const cors = require("cors");
const path = require("path");
const verifyToken = require("./middlewares/authMiddleware");
const uploadRoute = require("./routes/uploadRoute");

const PORT = process.env.PORT || 3000;

//db connection
DBCon();

// middlewares
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Or configure specific options
// test api
app.get("/", (req, res) => {
  res.send("hello");
});
// app.options("*", cors()); // Enable preflight for all routes

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [
    "https://muslima-henna.vercel.app"

  ]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", ["Content-Type, Authorization"]);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser()); // Enable cookie parsing
app.use(express.json());
// routes
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/likes", verifyToken, likesRoute);
app.use("/upload", verifyToken, uploadRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
