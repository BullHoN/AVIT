const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/facebook',
  passport.authenticate('facebook',{scope:['user_location','user_photos']}));

route.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
  res.redirect('/dashbord');
});

module.exports = route;
