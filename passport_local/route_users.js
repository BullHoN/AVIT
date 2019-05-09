const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const User = require('../oauth_models/local_model');
const nodemailer = require('nodemailer');
const passport = require('passport');
const {ensureAuthentication} = require('./auth_local');
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
    console.log(req.body.email);
    User.findOne({email:req.body.email}).then((user)=>{
      if(user){
        console.log('existing user');
        res.json({status:false});
      }else {
        console.log('new user');
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
  }
  });
});
//login verification
route.post('/login',(req,res,next)=>{
  console.log(req.body);
 passport.authenticate('local',(err,user,info)=>{
   if(err){
     return next(err);
   }
   User.findOne({email:user.email}).then((user1)=>{
     if(user1.isverified == 'true'){
       return res.json({status:false,mssg:'email not verified'});
     }
   }).catch((err)=>console.log(err));
   if(!user){
     console.log('not a registered user');
     return res.json({status:false});
   }
   req.logIn(user, function(err) {
    if (err) { return next(err); }
    console.log('can login');
    return res.json({status:true});
  });
 })(req,res,next);
});

route.get('/dashbord',ensureAuthentication,(req,res)=>{
  res.header('Cache-Control','private,no-cache,no-store,must-revalidate');
  res.header('Expires','-1');
  res.header('Pragma','no-cache');
  console.log(req.user);
  res.render('dashbord',{user:req.user});
});

route.post('/zalzera',(req,res)=>{
  require('./mail')(nodemailer,req.body.email,req.body.username);
});
//logout
route.get('/logout',(req,res)=>{
  req.logout();
  console.log('succesfully logout');
  res.redirect('/');
});
//forget password
route.post('/forget',(req,res)=>{
  User.findOne({email:req.body.email}).then((user)=>{
    if(!user){
      res.json({status:'not find email'});
    }else {
      bcrypt.genSalt(10,(err,salt)=>{
        if (err) throw err;
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
          user.password = hash;
          user.save().then(()=>{
            console.log('send mail');
            require('./forget_mail')(nodemailer,req.body.email,user.username,req.body.password);
            res.json({status:'email send'});
          }).catch((err)=>console.log(err));
        });
      });
    }
  });
});
//profile
route.get('/profile',ensureAuthentication,(req,res)=>{
  res.header('Cache-Control','private,no-cache,no-store,must-revalidate');
  res.header('Expires','-1');
  res.header('Pragma','no-cache');
  res.render('profile',{user:req.user});
});

route.post('/profile',ensureAuthentication,(req,res)=>{
  res.header('Cache-Control','private,no-cache,no-store,must-revalidate');
  res.header('Expires','-1');
  res.header('Pragma','no-cache');
  console.log(req.body);
  let hobbies = req.body.hobbies.split(',');
  console.log(hobbies);
  res.json({data:'this is working fine'});
  User.findOne({username:req.user.username}).then((user)=>{
    if(user.username!=req.body.username){
      user.username = req.body.username;
    }
    if(req.body.email !='' && req.body.email!=user.email){
      user.email = req.body.email;
    }
    if(req.body.hobbies !='' && req.body.hobbies!=user.about.hobbies){
      user.about.hobbies = req.body.hobbies;
    }
    if(req.body.intrests !='' && req.body.intrests!=user.about.intrests){
      user.about.intrests = req.body.intrests;
    }
    if(req.body.profession !='' && req.body.profession!=user.about.achivements){
      user.about.achivements = req.body.profession;
    }
    if(req.body.education !='' && req.body.education!=user.about.education){
      user.about.education = req.body.education;
    }
    user.save().then(()=>console.log('data changed')).catch((err)=>console.log(err));
  }).catch((err)=>console.log(err));
});

module.exports = route;
