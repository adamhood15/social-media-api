const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema used to create a Thought model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: () => Date.now().toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
          
            //Add getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


//reaction count virtual that displays the number of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = {thoughtSchema, Thought};