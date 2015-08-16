/**
* Thing.js *
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        //Thing:::
        name           : 'text',
        alternateName  : 'text',
        description    : 'text',
        image          : 'string',    // URL
        sameAs         : 'string',    // URL
        itemReverse    : { collection: 'thing', via: 'item' },  // So every Thing knows which ListItem it belongs to

        //Person:::
        additionalName : 'text',
        gender         : 'text',
        email          : { type: 'email', required: true, unique: true },

        //User:::
        password       : { type: 'text', minLength: 6 },    // TODO
        votes          : { collection: 'vote', via: 'votedBy' },
        socialProfiles : { type: 'object', defaultsTo: {} },

        //ItemList:::
        itemListElement: { collection: 'thing', via: 'itemListElementReverse' }, //i.e itemList's Element
        itemListOrder  : 'text',
        numberOfItems  : 'integer',

        //ListItem:::
        item                  : { collection: 'thing', via: 'itemReverse' }, // many-to-one relation
        itemListElementReverse: { collection: 'thing', via: 'itemListElement' }, // This maps to the Lists
        votesRecieved         : { collection: 'vote', via: 'votedOn' },
        votesUp               : { type: 'integer', defaultsTo: 0 },
        votesDown             : { type: 'integer', defaultsTo: 0 },

        //Inheritance:::
        level1         : 'array',
        level2         : 'array',
        level3         : 'array',
        level4         : 'array',
        level5         : 'array',
        level6         : 'array',
        level7         : 'array',
        
        // Helper
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.socialProfiles;
            return obj;
        }
    },


    // Custom functions
    createThing: function(opts, cb) {
        opts.level1 = 'thing';
        Thing.create(opts).exec(function(err, thing) {
            if(err) return cb(err);
            cb(null, thing);
        });
    },

    createPerson: function(opts, cb) {
        opts.level1 = 'thing';
        opts.level2 = 'person';
        Thing.create(opts).exec(function(err, thing) {
            if(err) return cb(err);
            cb(null, thing);
        });
    },

    createUser: function(opts, cb) {
        opts.level1 = 'thing';
        opts.level2 = 'person';
        opts.level3 = 'user';

        if (cb) {
            // If callback is given, its probably from ThingController
            Thing.create(opts).exec(function(err, thing) {
                if(err) return cb(err);
                cb(null, thing);
            });
        } else {
            // No callback, i.e. AuthCtrl
            // Auth controller expects a promise
            return Thing.create(opts);
        }
    },

    createItemList: function(opts, cb) {
        opts.level1 = 'thing';
        opts.level2 = 'intangible';
        opts.level3 = 'itemlist';
        Thing.create(opts).exec(function(err, thing) {
            if(err) return cb(err);
            cb(null, thing);
        });
    },

    createListItem: function(opts, cb) {
        opts.level1 = 'thing';
        opts.level2 = 'intangible';
        opts.level3 = 'listitem';
        Thing.create(opts).exec(function(err, thing) {
            if(err) return cb(err);
            cb(null, thing);
        });
    },

    // Lifecycle callbacks
    beforeUpdate: function(values, next) {
        CipherService.hashPassword(values);
        next();
    },
    beforeCreate: function(values, next) {
        CipherService.hashPassword(values);
        next();
    },

};
