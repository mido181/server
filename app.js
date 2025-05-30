// const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const DBConn = require("./config/database");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute")
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8000;
dotenv.config({ path: "config.env" });

//db connection
DBConn();

// middlewares
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use("/images", express.static(path.join(__dirname, "assets")));

// test api
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.json());

// routes
app.use("/auth", authRoute);
app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
