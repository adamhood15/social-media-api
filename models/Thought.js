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
            default: Date.now,
            //Add getter method to format the timestamp on query
            // get: formatDate
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
);

//reaction count virtual that displays the number of reactions
// thoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length + 1;
//   });

// formatDate(date) {
//     console.log(date)
// }

const Thought = model('thought', thoughtSchema);

module.exports = {thoughtSchema, Thought};