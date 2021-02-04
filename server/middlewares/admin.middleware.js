module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send(
        "unauthorized user! The client does not have access rights to the content"
      );
  next();
};
