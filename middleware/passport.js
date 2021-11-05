const LocalStrategy = require("passport-local").Strategy;
const JWTStategy = require("passport-jwt").Strategy;
const { fromAutherHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const user = require("../../db/models/User");

const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    let passwordsMatch;

    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStategy(
  {
    jwtFromRequest: fromAutherHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  () => {
    console.log("Hiiii!!!!!!");
  }
);
// exports.signin = (req, res) => {
//   console.log("exports.signin -> req", req.user);
// };
