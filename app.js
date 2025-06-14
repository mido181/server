// const cors = require("cors");
const app = require("./server");
const morgan = require("morgan");
const DBCon = require("./config/database");
const dotenv = require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;

//db connection
DBCon();

// middlewares
// if (process.env.NODE_ENV === "development") 
  app.use(morgan("dev"));


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
