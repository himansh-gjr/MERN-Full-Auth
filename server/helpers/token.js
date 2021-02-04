const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (user) {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.role == "admin" ? true : false },
    config.get("jwtPrivateKey")
  );
  return token;
};
