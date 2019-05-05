const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/google',passport.authenticate('google',{
  scope:['profile','email']
}));

route.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect('/dashbord');
});

module.exports = route;
