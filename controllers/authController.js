const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken");
const apiRes = require("../utils/apiResponse");
const errorRes = require("../utils/Error");
const asyncHandler = require("../middlewares/asyncHandler");

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  if ((!email && !password) || (!email && password)) {
    return next(
      new errorRes(400, "من فضلك قم بملاء حقل الايميل وكلمة السر بشكل صحيح ")
    );
  }
  if (
    (!firstName && !lastName) ||
    (!firstName && lastName) ||
    (firstName && !lastName)
  ) {
    return next(new errorRes(400, "من فضلك قم بملاء حقول الأسماء "));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorRes(400, "عذرا هذا الايميل مستخدم مستخدم من قبل"));
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nicName: req.body.nicName,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    country: req.body.country,
    gender: req.body.gender,
    brithdate: req.body.brithdate,
    isOnline: true,
  });
  condole.log('hhh')
  const refreshToken = await generateRefreshToken(user._id);
  const accessToken = await generateAccessToken(user._id);
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
  new apiRes(res, 200, { user }, "مرحبا بك في مجتمعنا");
  //  res.status(401).send(err);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const refreshTo = req.cookies.refreshToken;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorRes(404, "عذرا لا يوجد مستخدم بهذا الايميل"));
  }
  // 3. مقارنة كلمة المرور
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new errorRes(401, "كلمة السر خاطئة"));
  }
  // 4. إنشاء توكن إذا كانت صحيحة
  const refreshToken = await generateRefreshToken(user._id);
  const accessToken = await generateAccessToken(user._id);

  await User.findByIdAndUpdate(
      user._id,
      { $set: { refreshToken: refreshToken,isOnline:true } },
      { new: true, runValidators: true }
    );
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

  new apiRes(res, 200, { user }, "تم تسجيل الدخول بنجاح");
});
// catch (err) {
//   res.status(500).send("خطأ في المصادقة");
// }

// if (!user) throw new Error("Invalid credentials");

// 2. Check password
// const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) throw new Error('Invalid credentials');

// 3. Update online status (like BuzzArab's "Online Now")

exports.logout = asyncHandler(async (req, res) => {
  const refreshToken = await req.cookies.refreshToken;
  if (refreshToken) {
    await User.findOneAndUpdate(
      { refreshToken },
      { $set: { refreshToken: null , lastSeen:Date.now(),isOnline:false } }
    );
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  new apiRes(res, 200, null, "تم تسجيل الخروج بنجاح");
});

exports.me = asyncHandler(async (req, res) => {
  const refreshToken = await req.cookies.refreshToken;
  const extractedId = await verifyRefreshToken(refreshToken);
  const user = await User.findOne({ _id: extractedId.id });
  new apiRes(res, 200, { user });
});
