const passport = require('passport');
const User = require('../oauth_models/local_model');
const nodemailer = require('nodemailer');
const GoggleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(new GoggleStrategy({
  callbackURL:'https://avitg.herokuapp.com/oauth/google/redirect',
  clientID: '35357435775-n63j0bjrqn7ce4ne3hd79qfmgf2jogvb.apps.googleusercontent.com',
  clientSecret: 'c0mlNt7C_R2TiMebm-ez8jE0'
},(accessToken,refreshToken,profile,done)=>{
  console.log(profile);
  User.findOne({google_facebook_id:profile.id},{email:profile.emails[0].value}).then((user)=>{
    if(user){
      console.log('user already existied');
      done(null,user);
    }else {
      const newuser = new User({
        isverified:true,
        google_facebook_id:profile.id,
        email:profile.emails[0].value,
        username:'newuser_' + profile.id
      });
      newuser.save().then((nwuser)=>{
        console.log(profile);
        require('./new_mail')(nodemailer,nwuser.email,nwuser.username);
        console.log('new user');
        done(null,nwuser);
      });
    }
  });
})
);
