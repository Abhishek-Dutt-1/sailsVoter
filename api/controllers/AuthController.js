/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
    if(error) return res.serverError(error);
    if (!user) return res.unauthorized(null, info && info.code, info && info.message);
    
    return res.ok({
        //TODO: replace with new type of Cipher service
        token: CipherService.createToken(user),
        user: user
    });
};

module.exports = {

    /**
     * Sign up system
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    signup: function (req, res) {
        //User.create( _.omit( req.allParams(), 'id') )
        Thing.createUser( _.omit( req.allParams(), 'id' ) )
            .then( function(user) {
                return {
                    // TODO: replace with new type of Cypher service
                    token: CipherService.createToken(user),
                    user: user
                };
            })
            //.then( res.created )
            .then( res.ok )
            .catch( function(err) {

                if (err && err.code === 'E_VALIDATION') {
                    var errMsg = [];
                    if(err.invalidAttributes.email) {
                        err.invalidAttributes.email.forEach(function(e) {
                            if(e.rule == 'unique') {
                                errMsg.push('Email already registered. Did you forgot the password?');
                            }
                            if(e.rule == 'email') {
                                errMsg.push('Invalid Email.');
                            }
                        });
                    }
                    if(err.invalidAttributes.password) {
                        err.invalidAttributes.password.forEach(function(e) {
                            if(e.rule == 'minLength') {
                                errMsg.push('Password must be at least 6 characters.');
                            }
                        });
                    }
                    return res.badRequest(errMsg);
                }
            });
    },
    
    /**
    * Sign in by local strategy in passport
    * @param {Object} req Request object
    * @param {Object} res Response object
    */
    signin: function (req, res) {
        passport.authenticate( 'local', _onPassportAuth.bind(this, req, res) )(req, res);
    },

};
