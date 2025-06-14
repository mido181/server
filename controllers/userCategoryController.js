const { log } = require("console");
const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const apiRes = require("../utils/apiResponse");
const errorRes = require("../utils/Error");
const extractId = require("../utils/generateToken");

const selectedFields =
  "firstName lastName fullName nicName lastSeen age member _id images profilePicture city country isOnline";
// UserById
exports.getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id; // Convert string to number
  if (!userId) return next(new errorRes(404, "لا يوجد عضو بهذا ID"));
  const user = await User.find({ _id: userId });
  new apiRes(res, 200, { user });
});
// getAllUsers
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const page = parseInt(req.query.page) || 1; // Current page (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Documents per page (default: 10)
  const skip = (page - 1) * limit; // Calculate skip value
  const count = await User.countDocuments();
  const pagesCount = Math.ceil(count/10);
  const users = await User.find({ _id: { $nin: extractedId.id } })
    .select(selectedFields)
    .skip(skip)
    .limit(limit);

  new apiRes(res, 200, { links:pagesCount ,length: count, users , links:pagesCount });
});
// filterByOnlineUser
exports.getOnlineUsers = asyncHandler(
  async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const extractedId = await extractId.verifyRefreshToken(refreshToken);
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Documents per page (default: 10)
    const skip = (page - 1) * limit; // Calculate skip value
    const count = await User.countDocuments({ isOnline: true });
  const pagesCount = Math.ceil(count/10);
    
    const users = await User.find({
      isOnline: true,
      _id: { $nin: extractedId.id },
    })
      .select(selectedFields)
      .skip(skip)
      .limit(limit);

    new apiRes(res, 200, { links:pagesCount ,length: count, users });
  }
  // catch (error) {
  //   res.status(400).send(error);
  // }
);
// filterByNewest
exports.getNewestUsers = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const page = parseInt(req.query.page) || 1; // Current page (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Documents per page (default: 10)
  const skip = (page - 1) * limit; // Calculate skip value
  const count = await User.countDocuments(oneMonthAgo);
  const pagesCount = Math.ceil(count/10);
  
  const users = await User.find({
    createdAt: { $gte: oneMonthAgo },
    _id: { $nin: extractedId.id },
  });

  console.log(users);

  new apiRes(res, 200, { links:pagesCount ,length: count, users });
});
// filterByCity
exports.getByCityUsers = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const city = req.body.city || "giza";
  const count = await User.countDocuments({ city });
  const page = parseInt(req.query.page) || 1; // Current page (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Documents per page (default: 10)
  const skip = (page - 1) * limit; // Calculate skip value

  const pagesCount = Math.ceil(count/10);
  
  const users = await User.find({ city, _id: { $nin: extractedId.id } })
    .select(selectedFields)
    .skip(skip)
    .limit(limit);

  new apiRes(res, 200, { links:pagesCount ,length: count, users });
});
// filterByCountry
exports.getByCountryUsers = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const country = req.body.country;
  const page = parseInt(req.query.page) || 1; // Current page (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Documents per page (default: 10)
  const skip = (page - 1) * limit; // Calculate skip value
  const count = await User.countDocuments({
    country,
    _id: { $nin: extractedId.id },
  });
  const pagesCount = Math.ceil(count/10);
  const users = await User.find({ country })
    .select(selectedFields)
    .skip(skip)
    .limit(limit);

  new apiRes(res, 200, { links:pagesCount ,length: count, users });
});

exports.getImages = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const images = await User.findById({ _id: extractedId.id }).select("images");

  new apiRes(res, 200, { images });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const updates = req.body;
  // Handle file upload if present
  const user = await User.findByIdAndUpdate(
    extractedId.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new errorRes(404, "حدث خطأ اثناء تحديث البيانات"));
  }
  new apiRes(res, 200, { user });
});

exports.updateInterest = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const interest = req.body;
  // Handle file upload if present
  const user = await User.findByIdAndUpdate(
    extractedId.id,
    { $set: interest },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new errorRes(404, "حدث خطأ اثناء تحديث البيانات"));
  }
  new apiRes(res, 200, null, "تم اضأفة اهتماتك بنجاح");
});

exports.updateImages = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const extractedId = await extractId.verifyRefreshToken(refreshToken);
  const updatedUser = await User.findByIdAndUpdate(
    extractedId.id,
    { $set: { images: req.body.images } },
    { new: true, runValidators: true }
  );
  new apiRes(res, 200, req.body.images, "تم رفع الصور بنجاح ");
});

// Delete uploaded image
// exports.deleteImage = asyncHandler( async (req, res,next) => {
//     const { filename } = req.params;
//     const filePath = path.join(__dirname, 'public/images/users', filename);

//     fs.unlink(filePath, (err) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           message: 'Error deleting file',
//           error: err.message
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: 'File deleted successfully'
//       });
//     });
//   })
