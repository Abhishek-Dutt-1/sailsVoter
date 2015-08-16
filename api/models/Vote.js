/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        votedOn  : { model: 'thing' },      // ListItem's Id
        votedBy  : { model: 'thing' },      // UserId of voter
        voteType : { type: 'integer', defaultsTo: 1 },  // In case there are more than one types of votes (currently only 1)
        voteValue: { type: 'integer' }      // +1, -1
    }

};

