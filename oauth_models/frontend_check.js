const mongoose = require('mongoose');

const userScma = mongoose.Schema({
  email:{
    type:String
  },
  username:{
    type:String,
    required:true
  }
});

const User = mongoose.model('model',userScma);

module.exports  = User;
