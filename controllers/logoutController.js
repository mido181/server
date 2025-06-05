const User = require("../models/userModel");

exports.logout = async (req, res) => {

  const refreshToken = await req.cookies.refreshToken;
    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { $set: { refreshToken: null } }
      );
    }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(204).send("تم تسجيل الخروج بنجاح",refreshToken);

};
