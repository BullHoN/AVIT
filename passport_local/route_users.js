const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const User = require('./modal_user');
const nodemailer = require('nodemailer');

route.post('/',(req,res)=>{
  if (req.body.check == 'username') {
    //console.log(req.body.username);
    User.findOne({username:req.body.username}).then((user)=>{
      if(user){
        res.json({status:false});
      }else {
        res.json({status:true});
      }
    });
  }else if (req.body.check == 'email') {
    //console.log(req.body.email);
    User.findOne({email:req.body.email}).then((user)=>{
      if(user){
        res.json({status:false});
      }else {
        res.json({status:true});
      }
    });
  }
  else{
    //console.log('submited');
    res.json({status:true});
    const nwuser = new User({
      username:req.body.username,
      email:req.body.email,
      password:req.body.password
    });
    bcrypt.genSalt(10,(err,salt)=>{
      if (err) throw err;
      bcrypt.hash(req.body.password,salt,(err,hash)=>{
      if (err) throw err;
      nwuser.password = hash;
      nwuser.save().then(()=>{
      require('./mail')(nodemailer,req.body.email,req.body.username);
      }).catch((err)=>{if (err) throw err;});
      });
    });
}
});
route.get('/verify/:email/:source',(req,res)=>{
  res.header('Cache-Control','private,no-cache,no-store,must-revalidate');
  res.header('Expires','-1');
  res.header('Pragma','no-cache');
  let email = req.params.email+'@'+req.params.source+'.com';
  User.findOne({email:email}).then((user)=>{
    if(user){
    if(req.query.lnk == user.verfiy_url){
      user.isverified = true;
      user.save()
      .catch((err)=> {if (err) throw err;});
	  console.log('login worked');
	  res.redirect('/');
    }else {
      console.log('some error');
    }
    res.redirect('/');
  }
  });
});
module.exports = route;
