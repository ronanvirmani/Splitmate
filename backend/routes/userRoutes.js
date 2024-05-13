const express = require('express')
const { createUser, loginUser, getUsers, getUser, getUserGroups, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()

// CREATE a new user
router.post('/signup', createUser)

router.post('/login', loginUser)

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// GET the user's groups
router.get('/:id/groups', getUserGroups)

// UPDATE a user
router.patch('/:id', updateUser)

// DELETE a user
router.delete('/:id', deleteUser)

module.exports = router
