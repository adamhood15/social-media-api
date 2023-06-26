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
            max_length: 280,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: function (newDate) {
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                return new Date(newDate).toLocaleDateString(undefined, options);
              }
          
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,

    }
);


module.exports = reactionSchema;