module.exports = function (req, res, next) {
  if (req.user.isRole !== 2) res.status(401).send("Access denied");
  next();
};
