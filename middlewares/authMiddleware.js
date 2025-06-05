// authMiddleware.js
const jwt = require("jsonwebtoken");
const { verifyRefreshToken } = require("../utils/generateToken");

const verifyToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
        if (!accessToken) {
      return res.status(401).json({
        message: "يرجي تسجيل الدخول أولا",
        shouldLogin: true
      });
    }
  }
  try {
    // Verify token
    const verifyToken = await verifyRefreshToken(refreshToken);
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
  } catch (err) {
  if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "الجلسة انتهت",
        shouldRefresh: true // Frontend should attempt refresh
      });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token",
        shouldLogin: true
      });
    }
  }

  return next();
};

module.exports = verifyToken;
