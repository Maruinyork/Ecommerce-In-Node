const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require(`passport`);
const UserModel = require(`../repositories/models/user`);
const dotenv = require(`dotenv`);
dotenv.config();

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const jwetStrategy = () => {
    return passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        UserModel.findOne({ _id: jwt_payload.id }, (err, user) => {
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
}

module.exports = jwetStrategy;
