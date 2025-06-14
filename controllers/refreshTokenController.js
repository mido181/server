const router = require("express").Router();
const User = require("../models/userModel");
const { generateAccessToken, verifyRefreshToken } = require("../utils/generateToken");
const asyncHandler = require('../middlewares/asyncHandler')

exports.refreshToken = asyncHandler( async (req, res) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({error:'لا يوجد توكن'});
    // 1. Verify token and check DB

    const user = await User.findOne({ refreshToken });

    if (!user) return res.status(403).send('لا يوجد ');

const verify = await verifyRefreshToken(refreshToken)    
    // 2. Generate new access token
    const newAccessToken = generateAccessToken(user);
    // 3. Set new cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
    res.json({ success: true });
  } 
  // catch (err) {
  //   res.status(403).send(err);
  // }
)
