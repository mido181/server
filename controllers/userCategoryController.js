const { log } = require("console");
const User = require("../models/userModel");
// UserById
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Convert string to number
    console.log(userId);
    const users = await User.find({ _id: userId });
    res.status(200).send({user:users });
  } catch (error) {
    res.status(400).send(error);
  }
};
// getAllUsers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
};
// filterByOnlineUser
exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ isOnline: true });
    res.status(201).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};
// filterByNewest
exports.getNewestUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: 1 }); // 1 for ascending (earliest first)
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};
// filterByCity
exports.getByCityUsers = async (req, res) => {
  const country = req.body.city;

  try {
    const users = await User.find({ city: "giza" });
    res.status(201).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};
// filterByCountry
exports.getByCountryUsers = async (req, res) => {
  const country = req.body.country;
  try {
    const users = await User.find({ country: "egypt" });
    res.status(201).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};
