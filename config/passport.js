//Ref: https://ericswann.wordpress.com/2015/04/24/nozus-js-1-intro-to-sails-with-passport-and-jwt-json-web-token-auth/

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || 'SUPERSECRETSTRING';
var ALGORITHM = "HS256";
var ISSUER = 'google';
var AUDIENCE = 'google';

 
/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
 var JWT_STRATEGY_CONFIG = {
     secretOrKey: SECRET,
     issuer: ISSUER,
     audience: AUDIENCE,
     passReqToCallback: false   //
 };


/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
    //User.findOne({email: email})
    Thing.findOne({email: email})
        .exec(function (error, user) {
            if (error) return next(error, false, {});
            if (!user) return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: email + ' is not found'
            });

            // TODO: replace with new cipher service type
            if (!CipherService.comparePassword(password, user)) {
                return next(null, false, {
                    code: 'E_WRONG_PASSWORD',
                    message: 'Password is wrong'
                });
            }
            return next(null, user, {});
        });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
};

passport.use( new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth) );
passport.use( new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth) );

module.exports.jwtSettings = {
    expiresInMinutes: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm: ALGORITHM,
    issuer: ISSUER,
    audience: AUDIENCE
};
