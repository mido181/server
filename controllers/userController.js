const { log } = require("console");
const User = require("../models/registerModel");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
  console.log(req);
  try {
    const users = await User.find({});
    console.log(users + "fg");

    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ online: true });
    res.status(201).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ country: "egypt" }, { city: "giza" });
    res.status(201).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getNewestUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: 1 }); // 1 for ascending (earliest first)
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.body.id;
    const users = await User.find({ id });
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};
