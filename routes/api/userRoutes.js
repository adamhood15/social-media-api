const router = require('express').Router();
const userSchema = require('../../models/User');
const { getUsers, createUser, getUserId, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

// /api/users
//pulls all users and creates a user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
//deletes a user by id
router.route('/:userId').get(getUserId).delete(deleteUser).put(updateUser);

// /api/users/:userId/friend/:friendId
//Adds friend to user or delete
router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;