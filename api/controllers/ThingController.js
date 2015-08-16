/**
 * ThingController
 *
 * @description :: Server-side logic for managing Things
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createStuff: function(req, res) {

        switch(req.params.id) {
            case 'thing': 
                        Thing.createThing(req.allParams(), function(err, thing) {
                            if(err) throw new Error('"Thing" Not Saved');
                            return res.ok();
                        });
                        break;
            case 'person': 
                        Thing.createPerson(req.allParams(), function(err, thing) {
                            if(err) throw new Error('"Person" Not Saved');
                            return res.ok();
                        });
                        break;
            case 'user': 
                        Thing.createUser(req.allParams(), function(err, thing) {
                            /*
                            var keys = [];
                            for(var k in err) keys.push(k);
                            console.log(keys);
                            console.log(err.code);
                            console.log(err.invalidAttributes);
                            console.log(err._e);
                            console.log(err.rawStack);
                            console.log(err.reason);
                            console.log(err.status);
                            console.log(err.model);
                            console.log(err.details);
                            console.log(err.rules);
                            console.log(err.messages);
                            console.log(err.errors);
                            console.log(err.attributes);
                            console.log(err.keys);
                            console.log(err.length);
                            console.log(err.validationError);
                            console.log(err.toPOJO());
                            console.log(err.toJSON());
                            console.log(err.toLog());
                            console.log(err.inspect());
                            console.log(err.toString());
                            console.log(err.stack);
                            console.log(err.message);
                            */ 

                            if(err && err.code === 'E_VALIDATION') {
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
                            return res.ok( {user: thing} );
                        });
                        break;
            case 'itemlist': 
                        Thing.createItemList(req.allParams(), function(err, thing) {
                            if(err) throw new Error('"ItemList" Not Saved');
                            return res.ok();
                        });
                        break;
            case 'listitem': 
                        Thing.createListItem(req.allParams(), function(err, thing) {
                            if(err) throw new Error('"ListItem" Not Saved');
                            return res.ok();
                        });
                        break;
            default: throw new Error('Unable to create: Unknown Type');
        };

    },

};
