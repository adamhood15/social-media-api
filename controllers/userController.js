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

    async createUser(req, res) {
        console.log('create');

        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}