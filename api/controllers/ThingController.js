/**
 * ThingController
 *
 * @description :: Server-side logic for managing Things
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createThing: function(req, res) {

        Thing.createThing( { name: 'name2' }, function(err, thing) {
            if(err) throw new Error('"Thing" Not Saved');
            return res.ok();
        });
    },

};

