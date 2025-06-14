const sharp = require("sharp");

const extractId = require("../utils/generateToken");
module.exports = resizeImage = async (req, res, next) => {

    const refreshToken = req.cookies.refreshToken;
    const extractedId = await extractId.verifyRefreshToken(refreshToken);
  //   if (!req.files) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "No files uploaded",
  //     });
  //   }
  if (req.file) {
    const date = Date.now();
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/users/user-${extractedId.id}-${date}.jpeg`);
    req.body.profilePicture = `${req.protocol}://${req.host}/public/images/users/user-${extractedId.id}-${date}.jpeg`;
  }
  req.body.images = [];
  if (req.files) {
    await Promise.all(
      req.files.map(async (file) => {
        date = Date.now();
        await sharp(file.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(
            `public/images/users/user-${extractedId.id}-${
              file.originalname.split(".")[0]
            }.jpeg`
          );
        req.body.images.push(
          `${req.protocol}://${req.host}/public/images/users/user-${
            extractedId.id
          }-${file.originalname.split(".")[0]}.jpeg`
        );
      })
    );
  }
  next();
};
