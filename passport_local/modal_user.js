const mongoose = require('mongoose');


const userScma = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  isverified:{
    type:Boolean,
    default:false
  },
  verfiy_url:{
    type:String,
    default:''
  }
});

const User = mongoose.model('user',userScma);

module.exports = User;
