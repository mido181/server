const Like = require("../models/likedModel");
const Match = require("../models/matchesModel");
const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const apiRes = require("../utils/apiResponse");
const errorRes = require("../utils/Error");
const extractId = require("../utils/generateToken");
  const selectedFields =
  "fullName nicName lastSeen age member _id images profilePicture city country isOnline";

// Like a user

exports.likeUser = asyncHandler(
  async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
    const { likerId } = req.body;
    let checkMatch = async () => {
      const reverseLike = await Like.findOne({
        liker: extractedId.id,
        liked: likerId,
      });
      if (reverseLike) {
        const newMatch = new Match({ user: [likerId, extractedId.id] });
        await newMatch.save();
        return true;
      } else {
        return false;
      }
    };
    // Check if already liked
    const existingLike = await Like.findOne({ liker: likerId, liked: extractedId.id });
    if (existingLike) {
      return next(new errorRes(400, "أنت بالفعل معجب بهذا العضو"));
    }

    // Create new like
    if (!existingLike) {
      const newLike = new Like({ liker: likerId, liked: extractedId.id });
      await newLike.save();

      if (await checkMatch()) {
        new apiRes(res, 201, { message: "يوجد أعجاب متبادل", isMatch: true });
      } else {
        new apiRes(res, 201, { message: "تم أضافة ألاعجاب", isMatch: false });
      }
    }
    // Check for a match (if the other user also liked them)
  }

  //   atch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }
);
// Unlike a user
exports.unlikeUser = asyncHandler(
  async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
    const { likerId } = req.body;
    const deletedLike = await Like.findOneAndDelete({
      liker: likerId,
      liked: extractedId.id,
    });

    if (!deletedLike) {
      return next(new errorRes(400, "لا يوجد اعجاب "));
    }
    new apiRes(res, 200, null, "تم إزالة الاعجاب");
  }
  //
);
//  catch (err) {
//   res.status(500).json({ error: err.message });
// }
// )

// Get all users liked by a specific user
exports.allLikesOther = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const likes = await Like.find({
    liker: extractedId.id,
    status: "active",
  }).populate("liked", selectedFields);


  const users = likes.map((like) => like.liked);
  new apiRes(res, 200, {users});
});
//  catch (err) {
// res.status(500).json({ error: err.message });
// }
// })

// Get all users who liked the current user
exports.allLikesMe = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const likes = await Like.find({
    liked: extractedId.id,
    status: "active",
  }).populate("liker", selectedFields);

  const users = likes.map((like) => like.liker);
  new apiRes(res, 200, {users});
});
//  catch (err) {
// res.status(500).json({ error: err.message });
// }
// };

// Get all matches (mutual likes)
exports.allLikesEachother = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const matches = await Match.find({ user: extractedId.id }).populate(
    "user",
  selectedFields
  );

  new apiRes(res, 200, matches);
});
//  catch (err) {
// res.status(500).json({ error: err.message });
// }
// };
