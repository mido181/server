const { log } = require("node:console");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const ApiResponse = require('../utils/apiResponse');
const ApiError= require('../utils/errorResponse');

exports.createNewUser = async (req, res) => {
  const ImgUrl = `${req.protocol}://${req.get("host")}/assets/default.jpg`;
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("عذرا ! هذا الايميل مستخدم من قبل ");
    }
    // test
    const e = [true, false];
    const test = Math.random() * 2;
    const clone = {
      ...req.body,
      isOnline: e[test + 1],
      profilePicture: ImgUrl,
    };
    const user = await User.create(clone);
    const refreshToken = await generateRefreshToken(user);
    const accessToken = await generateAccessToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: isProduction,
      // sameSite: isProduction ? "strict" : "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: isProduction,
      // sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
       new ApiResponse(res,201,{user})
  } catch (err) {
    res.status(401).send(err);
  }
};
