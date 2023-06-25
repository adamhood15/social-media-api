const router = require('express').Router();
const thoughtSchema = require('../../models/Thought');
const { getThoughts, createThought, getThoughtId, deleteThought, updateThought } = require('../../controllers/thoughtController');

// /api/thoughts
//pulls all thoughts and creates a thought
router.route('/').get(getThoughts).post(createThought);

// /api/users/:thoughtId
//deletes a user by id
router.route('/:thoughtId').get(getThoughtId).put(updateThought);

router.route('/:thoughtId/user/:userId').delete(deleteThought);

module.exports = router;