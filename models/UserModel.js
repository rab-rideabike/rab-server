const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile Number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  district: {
    type: String,
    default: 'Guntur',
  },
  college: {
    type: String,
    default: 'KLU',
  },
  collegeIdCard: {
    type: String,
  },
  identityProofType: {
    type: String,
  },
  identityProofDocument: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
    console.log("Pre Middleware")
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.isCorrectPassword = async function(formPassword, userPassword){
    return await bcrypt.compare(formPassword, userPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
