const router = require('express').Router();
const userSchema = require('../../models/User');
const { getUsers, createUser, getUserId, deleteUser } = require('../../controllers/userController');

// /api/users
//pulls all users and creates a user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
//deletes a user by id
router.route('/:userId').get(getUserId).delete(deleteUser);

module.exports = router;