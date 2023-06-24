const { Thought } = require('../models/Thought');

module.exports = {
    //Get all thought
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
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
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.deleteOne({ _id: req.params.thoughtId });
            res.json(thought);
        } catch (err) {
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
    }


}