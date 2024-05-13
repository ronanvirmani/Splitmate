const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    }]
}, {timestamps: true})

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

// Method to compare passwords
userSchema.statics.login = async function (email, password){

    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    
    return user
}

module.exports = mongoose.model('User', userSchema)