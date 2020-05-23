const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied. No token provided.");
  try {
    const decode = jwt.verify(token, "jwtPrivateKey");
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
