const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
userSchema.statics.signup = async function(email, password, name){

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, name})

    return user
}

// Method to compare passwords
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

module.exports = mongoose.model('User', userSchema)