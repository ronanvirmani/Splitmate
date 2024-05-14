const User = require('../models/User')
const mongoose = require('mongoose')
const Group = require('../models/Group');
const JWT = require('jsonwebtoken');

const createToken = (_id) => {
    return JWT.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


// create a new user
const createUser = async (req, res) => {
    
    const { email, password, name } = req.body;

    try {
        const user = await User.signup(email, password, name);

        // Password is valid, generate JWT token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)

        // Password is valid, generate JWT token
        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const user = await User.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get the user's groups
const getUserGroups = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const user = await User.findById(id);
        if (user) {
            const groups = await Group.find({ members: id });
            res.json(groups);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user })
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findOneAndDelete({_id: id})
    
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user)
}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUser,
    getUserGroups,
    updateUser,
    deleteUser
}