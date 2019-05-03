const localstrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./modal_user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

let emailverified=true;
module.exports.passport = function (passport) {
  passport.use(new localstrategy({
    usernameField: 'email'
  },
  function (email,password,done) {
    User.findOne({email:email}).then((user)=>{
     if(!user){
       console.log('email not registered');
       return done(null,false);
     }
     bcrypt.compare(password,user.password,(err,isMatch)=>{
       if (err) throw err;
       if(isMatch){
         if(user.isverified){
           console.log('user has login');
           return done(null,user);
         }else {
           emailverified=false;
           console.log('email not verified');
           return done(null,false);
         }
       }else {
         console.log('wrong password');
         return done(null,false);
       }
     });
   }).catch((err)=>console.log(err));
  }
));
passport.serializeUser(function (user,done){
  done(null,user.id);
});
passport.deserializeUser(function (id,done)  {
  User.findById(id,function (err,user) {
    if (err) throw err;
    done(err,user);
  });
});
}
module.exports.emailverified = emailverified;
