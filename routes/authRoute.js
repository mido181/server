const router = require("express").Router();
const { createNewUser } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");
const { logout } = require("../controllers/logoutController");
const { refreshToken } = require("../controllers/refreshTokenController");
const {checkAuthStatus} = require('../controllers/checkAuth.controller')
router.post("/register", createNewUser);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/status", checkAuthStatus);


module.exports = router;
