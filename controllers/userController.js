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
            const user = await User.findById(req.params.userId)
            .populate({ path: 'thoughts'})
            .populate({ path: 'friends'})
            .exec();
            
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
            res.json({message: 'User deleted!'});
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
                {new: true});

            const newUser = await User.findById(req.params.userId);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            const user2 = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId } },
                { new: true }
            );

            const newUser = await User.findById(req.params.userId);
            res.json(newUser);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try { 
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            const user2 = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }
            );

            const newUser = await User.findById(req.params.userId);
            res.json(newUser);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }


}