const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema used to create a Thought model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: function (newDate) {
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                return new Date(newDate).toLocaleDateString(undefined, options);
              }
          
            //Add getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        
        toJSON: {
            getters: true,
        },
        id: false,

    }
);


//reaction count virtual that displays the number of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = {thoughtSchema, Thought};