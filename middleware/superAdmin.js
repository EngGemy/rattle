module.exports = function (req, res, next) {
  if (req.user.isRole !== 1) res.status(401).send("Access denied");
  next();
};
