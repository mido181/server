const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const ApiResponse = require('../utils/apiResponse')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const refreshTo = req.cookies.refreshToken;
   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("المستخدم غير موجود");
    }
    // 3. مقارنة كلمة المرور
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
      return res.status(401).send("كلمة المرور خاطئة");
    }
    // 4. إنشاء توكن إذا كانت صحيحة
    const refreshToken = await generateRefreshToken(user);
    const accessToken = await generateAccessToken(user);
    user.isOnline = true;
    user.refreshToken = refreshToken;
    await User.create(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

   new ApiResponse(res,200,{user})
  } catch (err) {
    res.status(500).send("خطأ في المصادقة");
  }
};

// if (!user) throw new Error("Invalid credentials");

// 2. Check password
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) throw new Error('Invalid credentials');

// 3. Update online status (like BuzzArab's "Online Now")
