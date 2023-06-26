const { Thought } = require('../models/Thought');
const { User } = require('../models/User');
var mongoose = require('mongoose');


module.exports = {
    //Get all thought
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getThoughtId(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        console.log('create');

        try {
            console.log('You are adding a thought');
            console.log(req.body);
            const thought = await Thought.create(req.body);
            //Adds the thought object to the User that was provided
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'No user found with that ID '})
            };
            

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.deleteOne({ _id: req.params.thoughtId });
            console.log(req.params.thoughtId);

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { thoughts: { _id: req.params.thoughtId } } },
                { runValidators: true, new: true},

            );

            if (!user) {
                return res
                  .status(404)
                  .json({message: 'No user found with that ID'});
            };

            res.json({message: 'User deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    async updateThought(req, res) {
        try {
            const thought = await Thought.updateOne(
                { _id: req.params.thoughtId }, 
                { 
                    thoughtText: req.body.thoughtText,
                    createdAt: req.body.createdAt,
                    username: req.body.username,
                    reactions: req.body.reactions,
                }, 
                {returnOriginal: false});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            //if no reactionId is created, server will generate one automatically
            if (!req.body.reactionId) {
                const rId = new mongoose.Types.ObjectId();
                const reaction = {
                    "reactionId": `${rId}`,
                    "reactionBody": `${req.body.reactionBody}`,
                    "username": `${req.body.username}`,
                    "createdAt": `${req.body.createdAt}`
                }
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: reaction }},
                    { new: true }
                );
                res.json(thought);

            } else {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: req.body }},
                    { new: true }
                );
                res.json(thought);
            }

        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body.reactionId }},
                { new: true }
            );

            res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }


}