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
        //Person:::
        additionalName : 'text',
        gender         : 'text',
        email          : { type: 'string', email: true },
        //User:::
        password       : 'text',    // TODO
        //ItemList:::
        itemListElement: { collection: 'thing', via: 'item' },
        itemListOrder  : 'text',
        numberOfItems  : 'integer',
        //ListItem:::
        item           : { collection: 'thing', via: 'itemListElement' },
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



};
