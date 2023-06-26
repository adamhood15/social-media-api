const router = require('express').Router();
const thoughtSchema = require('../../models/Thought');
const { getThoughts, createThought, getThoughtId, deleteThought, updateThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// /api/thoughts
//pulls all thoughts and creates a thought
router.route('/').get(getThoughts).post(createThought);

// /api/users/:thoughtId
//gets a single thought by id or updates
router.route('/:thoughtId').get(getThoughtId).put(updateThought);

router.route('/:thoughtId/user/:userId').delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;