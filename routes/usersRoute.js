const router = require("express").Router();
const {
  getAllUsers,
  getOnlineUsers,
  getNewestUsers,
  getUserById,
  updateUser,
  updateImages,
  getImages,
  updateInterest
} = require("../controllers/userCategoryController");

const upload = require("../middlewares/uploadMiddleware");
const resizeImage = require("../middlewares/resizeImageMiddleware");

router.get("/", getAllUsers);
router.get("/actives", getOnlineUsers);
router.get("/newest", getNewestUsers);
router.get("/id/:id", getUserById);
router.get("/images", getImages);
router.put("/update", upload.single("profilePicture"), resizeImage, updateUser);
router.put(
  "/uploadImages",
  upload.array("images", 5),
  resizeImage,
  updateImages
);
router.put("/updateInterest", updateInterest);



module.exports = router;
