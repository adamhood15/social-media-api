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
            default: () => Date.now().toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
          
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
);


//reaction count virtual that displays the number of reactions
// thoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length + 1;
//   });



// thoughtSchema.virtual('formatDate').get(function() {
//     return this.createdAt.toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}); 
// });

const Thought = model('thought', thoughtSchema);

module.exports = {thoughtSchema, Thought};