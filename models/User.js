const { Schema, model } = require('mongoose');

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
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
            }
        ],

        //friends: [userSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
)

const User = model('user', userSchema);

module.exports = { User };