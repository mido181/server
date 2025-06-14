const router = require("express").Router();
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshTokenController");
const { checkAuthStatus } = require("../controllers/checkAuth.controller");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/status", checkAuthStatus);
router.get("/me", me);

module.exports = router;
