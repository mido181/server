const jwt = require("jsonwebtoken");

const generateAccessToken = async (user) => {
  return jwt.sign({ id: user }, "4x5k8zL2e9pQ1rT7wY3v6uC0oB9nM2lK5jH8gF1dS4aV7qE", {
    expiresIn: "1h",
  });
};

const generateRefreshToken = async (user) => {
  return jwt.sign(
    { id: user },
    '4x5k8zL2e9pQ1rT7wY3v6uC0oB9nM2lK5jH8gF1dS4aV7qEiiiiui87987hoih',
    { expiresIn: "2d" } // Longer-lived refresh token
  );
};

const verifyRefreshToken = async (token) => {
  return jwt.verify(token, '4x5k8zL2e9pQ1rT7wY3v6uC0oB9nM2lK5jH8gF1dS4aV7qEiiiiui87987hoih', { algorithms: ['HS256'] });
};

const verifyAccessToken = async (token) => {
  return jwt.verify(token, "4x5k8zL2e9pQ1rT7wY3v6uC0oB9nM2lK5jH8gF1dS4aV7qE", { algorithms: ['HS256'] });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken
};
