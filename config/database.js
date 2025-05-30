const mongoose = require("mongoose");

const DBConn = () => {
  mongoose
    .connect(
      "mongodb+srv://mohamed:Zm03gu7bMzdMor00@cluster0.z4nvyjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((conn) => {
      console.log(`DB connections Success ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`connection Error happen ${err}`);
      process.exit(1);
    });
};

module.exports = DBConn;
