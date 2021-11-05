const user = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, // the token will expire after 15 minutes
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

//signup
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    _id: user._id,
    username: user.username,
  };
};

exports.signin = (req, res) => {
  console.log("exports.signin -> req", req.user);
};
