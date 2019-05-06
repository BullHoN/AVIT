const mongoose = require('mongoose');

const friendsScma = mongoose.Schema({
  accepted:[{name:String}],
  pending:[{name:String}]
});

const projectScma = mongoose.Schema({
  title:String
});

const facebook_google_Scha = mongoose.Schema({
  facebook_id:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  email:{
    type:String
  },
  todos:[{title:String,desc:String}],

  friends:[friendsScma],

  profilepick:[{url:String}],

  images:[{filename:String}],

  videos:[{filename:String}],

  files:[{filename:String}],

  projects:[projectScma],

  about:{
    intrests:[{name:String}],
    hobbies:[{name:String}],
    education:[{name:String}],
    achivements:[{name:String}]
  }
});

const facebook_google_user = mongoose.model('facebook_google_user',facebook_google_Scha);

module.exports = facebook_google_user;
