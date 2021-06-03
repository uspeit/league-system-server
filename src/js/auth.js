import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from './models/user.js'
import fs from 'fs'

const privateKey = fs.readFileSync('keys/private.pem');

var JwtStrategy = passportJwt.Strategy,
    ExtractJwt = passportJwt.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = privateKey;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.getById(jwt_payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

export default passport