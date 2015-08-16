// Ref: https://ericswann.wordpress.com/2015/04/24/nozus-js-1-intro-to-sails-with-passport-and-jwt-json-web-token-auth/
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
    secret: sails.config.jwtSettings.secret,
    issuer: sails.config.jwtSettings.issuer,
    audience: sails.config.jwtSettings.audience,

    /**
     * Hash the password field for the passed used
     */
    hashPassword: function(user) {
        if(user.password) {
            user.password = bcrypt.hashSync(user.password);
        }
    },

    /**
     * Compare user password hash with unhashed password
     * @returns boolean indicating match
     */
     comparePassword: function(password, user) {
         return bcrypt.compareSync(password, user.password);
     },

     /**
      * Create a token based on the passed user
      * @param user
      */
     createToken: function(user) {
         return jwt.sign({
                 user: user.toJSON()
             },
             sails.config.jwtSettings.secret,
             {
                 algorithm: sails.config.jwtSettings.algorithm,
                 expiresInMinutes: sails.config.jwtSettings.expiresInMinutes,
                 issuer: sails.config.jwtSettings.issuer,
                 audience: sails.config.jwtSettings.audience
             });
     }
};
