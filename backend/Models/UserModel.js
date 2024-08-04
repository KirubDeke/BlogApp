const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

      username:{
        type: String,
        required: true,
        unique: true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password:{
        type: String,
        required: true,
      },
      role: { 
        type: String, 
        default: 'user',
        enum: ['user', 'admin', 'author']
         },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },

});
module.exports = mongoose.model('User', userSchema);