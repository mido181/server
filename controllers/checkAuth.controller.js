const asyncHandler = require("../middlewares/asyncHandler");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/generateToken");

// cosnt asyncHandler = require('../middlewares/')
exports.checkAuthStatus = async (req, res) => {
  // 1. Check if access token exists and is valid
  try {
    const token = req.cookies.accessToken;
    if (!token) throw new Error("No token");

    const verifyToken = await verifyAccessToken(token);
    if (verifyToken) res.json({ isAuthenticated: true });
  } catch (error) {
    // 2. If access token expired, check refresh token
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      try {
        await verifyRefreshToken(refreshToken);
        // Optional: Verify refresh token exists in DB
        res.json({ isAuthenticated: true });
        return;
      } catch (e) {
        res.json({ isAuthenticated: false });
        // Refresh token invalid
      }
    }
    res.json({ isAuthenticated: false });
  }
};
