const { Schema, model } = require('mongoose');

//Schema used to create a Thought model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minimum: 1,
            maximum: 280
        },
        createdAt: {
            type: Date,
            default: Date.now 
            //Add getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        //reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = {thoughtSchema, Thought};