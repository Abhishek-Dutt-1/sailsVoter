/**
* Thing.js
*
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
        email          : { type: 'string', email: true },
        //User:::
        password       : 'text',    // TODO
        //ItemList:::
        itemListElement: { collection: 'thing', via: 'itemListElementReverse' }, //i.e itemList's Element
        itemListOrder  : 'text',
        numberOfItems  : 'integer',
        //ListItem:::
        item                  : { collection: 'thing', via: 'itemReverse' }, // many-to-one relation
        itemListElementReverse: { collection: 'thing', via: 'itemListElement' }, // This maps to the Lists
        //Inheritance:::
        level1         : 'array',
        level2         : 'array',
        level3         : 'array',
        level4         : 'array',
        level5         : 'array',
        level6         : 'array',
        level7         : 'array',
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
        Thing.create(opts).exec(function(err, thing) {
            if(err) return cb(err);
            cb(null, thing);
        });
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

};
