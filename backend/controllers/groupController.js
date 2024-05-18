const Group = require('../models/Group')
const User = require('../models/User')

// CREATE a new group
const createGroup = async (req, res) => {
    const { userId } = req.params;
    const { name, items } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const newGroup = new Group({
        name,
        members: [userId],
        items
    })

    const group = await newGroup.save();
    await user.save();

    
    if (!group) {
        return res.status(400).json({mssg:'Group could not be created'})
    }
    
    res.status(200).json(group)
    
};

// Add user(s) to a group
const addUsersToGroup = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is already a member of the group
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of the group' });
        }

        // Add user to the group
        group.members.push(userId);
        await group.save();

        res.json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Remove user(s) from a group
const removeUsersFromGroup = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove user from the group
        group.members = group.members.filter(memberId => memberId.toString() !== userId);
        const newGroup =  await group.save();

        res.json(newGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

// Add item to a group
const addItemToGroup = async (req, res) => {

    const { groupId } = req.params;
    const { name, price } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const newItem = { name, price };
        group.items.push(newItem);
        const newGroup = await group.save();

        res.json(newGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Remove item from a group
const removeItemFromGroup = async (req, res) => {
    const { groupId } = req.params;
    const { itemId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Find the index of the item with the given itemId
        const index = group.items.findIndex(item => item._id == itemId);
        if (index === -1) {
            return res.status(404).json({ message: 'Item not found in group' });
        }

        // Remove the item from the items array
        group.items.splice(index, 1);
        const newGroup = await group.save();

        res.json(newGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a group
const deleteGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const deletedGroup = await group.remove();
        res.json({ message: 'Group deleted' }, deletedGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all items in a group
const getGroup = async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const group = await Group.findById(groupId).populate('members', 'name');
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      
      res.json(group);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


module.exports = {
    createGroup,
    addUsersToGroup,
    removeUsersFromGroup, 
    addItemToGroup, 
    removeItemFromGroup, 
    deleteGroup, 
    getGroup
}