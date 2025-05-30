const router = require("express").Router();
const {
  getAllUsers,
  getOnlineUsers,
  getNewestUsers,
  getUserById,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/actives", getOnlineUsers);
router.get("/newest", getNewestUsers);
router.post("/id", getUserById);

module.exports = router;
