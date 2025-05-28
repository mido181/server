const mongoose = require('mongoose');

const DBConn = () => {
  mongoose.connect('mongodb://localhost:27017/test')
    .then((conn) => {
      console.log(`DB connections Success ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`connection Error happen ${err}`);
      process.exit(1);
    });
};

module.exports =  DBConn;
