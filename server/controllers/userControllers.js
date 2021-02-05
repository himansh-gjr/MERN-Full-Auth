const bcrypt = require("bcrypt");
const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;

const { User, validate, validateUpdateUser } = require("../models/user");
const genToken = require("../helpers/token");

exports.registerController = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const alreadyExists = await User.find({ email: req.body.email });
  if (alreadyExists.length !== 0)
    return res.status(400).send("user already exists!!");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });
  const token = genToken(user);
  req.user = user;

  await user.save();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "email", "role"]));
};

exports.getProfileController = async (req, res) => {
  const userID = req.user._id;
  const validUserID =
    ObjectId.isValid(userID) && new ObjectId(userID) == userID;

  if (!validUserID) return res.status(400).send("invalid _id in params");

  const user = await User.findById(userID);

  if (!user) return res.status(400).send("User not found with the given ID");

  res.json(_.pick(user, ["name", "email"]));
};

exports.profileUpdateController = async (req, res) => {
  // req.user will be assigned in auth middleware funtion
  // confirm password and old password on fronted (optional for now)
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, password, email } = req.body;
  const user = await User.findOne({ _id: req.user._id }); // will return a data of current user

  if (!user) return res.status(400).send("User not Found");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.set({ name: name, password: hashedPassword, email: email });
  user.save(); // new data of user

  res.send("User Updated");
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("provide email and password");

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(400)
      .send("invalid email!! No user found with the given email");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return res.status(400).send("invalid password");

  const token = genToken(user);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
};

exports.logoutController = (req, res) => {
  res.send("logout").removeHeader("x-auth-token");
};

exports.adminController = (req, res) => {
  res.send("admin page");
};
