const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

//Schema used to create a User model

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            unique: true,
            match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
        },
        thoughts: [thoughtSchema],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user'
            }
        ],
    },
    {
        toJSON: {
            getters: true,
        },
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = { User };