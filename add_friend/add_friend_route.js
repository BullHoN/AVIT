const express = require('express');
const User = require('../oauth_models/local_model');
const route = express.Router();


route.get('/dashbord/loader',(req,res)=>{
  res.render('loader');
});

route.post('/dashbord/accept_request',(req,res)=>{
  User.findOne({username:req.user.username}).then((user)=>{
    if (user) {
      user.friends.forEach((newfrnd)=>{
        if (newfrnd.name == req.body.acceptedof) {
          newfrnd.isAccepted = true;
          User.findOne({username:req.body.acceptedof}).then((nwuser)=>{
            if (nwuser) {
              nwuser.friends.push({name:req.user.username,isAccepted:true,profilepick:user.profilepick.url});
              nwuser.save().catch((err)=>console.log(err));
              res.json({status:'request accepted'});
              newfrnd.profilepick = nwuser.profilepick.url;
              user.save().then(()=>console.log('request accepted')).catch((err)=>console.log(err));
            }
          });
        }
      });
    }
  });
});

route.post('/dashbord/addfriend',(req,res)=>{
  User.findOne({username:req.body.from}).then((user)=>{
    if (user) {
      user.friends.push({name:req.user.username,isAccepted:false});
      user.save().then(()=>{
        console.log('pending request added');
        res.json({status:'disable the button'});
      }).catch((err)=>console.log(err));
    }
  });
  console.log(req.body.from +' to ' +req.user.username);
});

module.exports = route;
