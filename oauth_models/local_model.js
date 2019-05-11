const mongoose = require('mongoose');


const friendsScma = mongoose.Schema({
  accepted:[{name:String}],
  pending:[{name:String}]
});

const projectScma = mongoose.Schema({
  title:String
});

const local_Scma = mongoose.Schema({
  google_facebook_id:{
    type:String
  },
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
  },
  password:{
    type:String,
  },
  isverified:{
    type:Boolean,
    default:false
  },
  verfiy_url:{
    type:String,
    default:''
  },
  todos:[{title:String,desc:String}],

  friends:[friendsScma],

  profilepick:{
    url:{
      type:String,
      default:'no link'
    }
  },

  coverphoto:{
    url:{
      type:String,
      default:'no link'
    }
  },

  images:[{filename:String}],

  videos:[{filename:String}],

  files:[{filename:String}],

  projects:[projectScma],

  about:{
    intrests:{type:String},
    hobbies:{type:String},
    education:{type:String},
    achivements:{type:String}
  }
});

const local_user = mongoose.model('local_user',local_Scma);

module.exports = local_user;
