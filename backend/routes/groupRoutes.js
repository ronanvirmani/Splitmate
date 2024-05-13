const express = require('express')
const { createGroup, addUsersToGroup, removeUsersFromGroup, addItemToGroup, removeItemFromGroup, deleteGroup, getGroup } = require('../controllers/groupController')
const router = express.Router()

// CREATE a new group
router.post('/:userId', createGroup)

// Add user(s) to a group
router.post('/:groupId/addUser', addUsersToGroup)

// Remove user(s) from a group
router.delete('/:groupId/removeUser', removeUsersFromGroup)

// Add items to a group
router.post('/:groupId/addItem', addItemToGroup)

// Remove item(s) from a group
router.delete('/:groupId/removeItem', removeItemFromGroup)

// Delete a group
router.delete('/:groupId', deleteGroup)

// Get a group
router.get('/:groupId', getGroup)

module.exports = router
