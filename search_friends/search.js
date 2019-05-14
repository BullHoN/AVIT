const express = require('express');
const User = require('../oauth_models/local_model');
const route = express.Router();
const {ensureAuthentication} = require('../passport_local/auth_local');


route.get('/admin/users',ensureAuthentication,(req,res)=>{
  User.find({}).then((users)=>{

    let usernames = [];
    for (let i=0;i<users.length;i++){
      usernames.push({username:users[i].username,profilepick:users[i].profilepick.url});
    }
    res.json({user:usernames});
  });
});

route.get('/dashbord/users/profile/:username',ensureAuthentication,(req,res)=>{
  console.log(req.user);
  User.findOne({username:req.params.username}).then((user)=>{
    if (user) {
      res.render('other_profile',{user:user,main_user:req.user});
    }else {
      res.json({error:'no user exist'});
    }
  });
});

module.exports = route;
