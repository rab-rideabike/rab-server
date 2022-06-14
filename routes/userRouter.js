const { signUp, logIn, protect } = require('../controllers/authController');
const { getUsers, getUserById, updateUserById, deleteUserById, createUser } = require('../controllers/userController');

const router = require('express').Router();

router.route('/').get(protect, getUsers).post(createUser);

router.route('/signup').post(signUp);

router.route('/login').post(logIn);

router.route('/:id').get(getUserById).patch(updateUserById).delete(deleteUserById)

module.exports = router;