const { Schema, model } = require('mongoose');

//Schema used to create a Reaction model

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            maximum: 280,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now().toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
          
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


module.exports = reactionSchema;