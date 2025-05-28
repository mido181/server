const User = require("../models/registerModel");
const mongoose = require("mongoose");

exports.login = async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.find({ email }).select("+password");
  console.log(user)
  if (!user) throw new Error('Invalid credentials');

  // 2. Check password
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) throw new Error('Invalid credentials');

  // 3. Update online status (like BuzzArab's "Online Now")
  user.isOnline = true;
  user.lastSeen = new Date();

  // await User.save();

  // 4. Generate JWT token
  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: '30d',
  //   });

  res.status(200);
  // .json({ success: true, token, user });
};
