const express = require('express')
const { createUser, loginUser, getUsers, getUserGroups } = require('../controllers/userController')
const router = express.Router()

// CREATE a new user
router.post('/signup', createUser)

router.post('/login', loginUser)

// GET all users
router.get('/', getUsers)

// GET the user's groups
router.get('/:id/groups', getUserGroups)

module.exports = router
