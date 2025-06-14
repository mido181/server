const jwt = require("jsonwebtoken");

const generateAccessToken = async (user) => {
  return jwt.sign({ id: user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = async (user) => {
  return jwt.sign(
    { id: user },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" } // Longer-lived refresh token
  );
};

const verifyRefreshToken = async (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
};

const verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken
};
