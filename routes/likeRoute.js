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
router.get("/liked", allLikesOther);
router.get("/likers", allLikesMe);
router.get("/matches", allLikesEachother);

module.exports = router;
