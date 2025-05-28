const mongoose = require("mongoose");
const User = require("../models/registerModel");

exports.createNewUser = (req, res) => {
  const user = User.create({ ...req.body })
    .then((r) => {
        console.log(r+'fssdf')
    res.status(201).send("thank you");
    
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error");
    });
};
