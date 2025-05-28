// const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const DBConn = require("./config/database");
const authRoute = require('./routes/authRoute')
dotenv.config({ path: "config.env" });

//db connection
DBConn();

// middlewares
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// routes
app.use("/auth",authRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
