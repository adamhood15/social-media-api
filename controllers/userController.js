const { User } = require('../models/User');

module.exports = {
    //Get all users
    async getUsers(req, res) {
        console.log('get');
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserId(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        console.log('create');

        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params.userId });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.updateOne(
                { _id: req.params.userId }, 
                { 
                    username: req.body.username,
                    email: req.body.email,
                    thoughts: req.body.thoughts,
                    friends: req.body.friends,
                }, 
                {returnOriginal: false});
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }


}