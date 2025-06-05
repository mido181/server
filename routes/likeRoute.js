
const router = require("express").Router();

const {
  likeUser,
  unlikeUser,
  allLikesOther,
  allLikesMe,
  allLikesEachother,
} = require("../controllers/likedController");

router.post("/", likeUser);
router.post("/unlike", unlikeUser);
router.get("/liked/:userId", allLikesOther);
router.get("/liked-by/:userId", allLikesMe);
router.get("/matches/:userId", allLikesEachother);

module.exports = router;
