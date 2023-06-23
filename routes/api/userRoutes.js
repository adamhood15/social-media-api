const router = require('express').Router();
const userSchema = require('../../models/User');
const { getUsers, createUser } = require('../../controllers/userController');

// /api/users

router.route('/').get(getUsers).post(createUser);


module.exports = router;