import passport from "passport";
import passportJwt from "passport-jwt";
import User from "./models/user.js";
import fs from "fs";

const publicKey = fs.readFileSync("keys/public.pem");

var JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ["RS256"],
};

export function verifyUserToken(jwt_payload, done) {
  User.getById(jwt_payload.sub, function (user, err) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}

passport.use(new JwtStrategy(opts, verifyUserToken));

export default passport;
