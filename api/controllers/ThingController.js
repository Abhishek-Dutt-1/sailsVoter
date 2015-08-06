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
                            if(err) throw new Error('"User" Not Saved');
                            return res.ok();
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

