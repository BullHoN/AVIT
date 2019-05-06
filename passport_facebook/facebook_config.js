const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../oauth_models/local_model');
const nodemailer = require('nodemailer');
const passport = require('passport');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(new FacebookStrategy({
  callbackURL:'https://avitg.herokuapp.com/oauth/facebook/redirect',
  clientID: '428141768013913',
  clientSecret: 'b693b007e86a0d6ff96f24f90eaa3bda'
},(accessToken,refreshToken,profile,done)=>{
  console.log(profile);
  User.findOne({email:profile.id}).then((user)=>{
    if(user){
      console.log('user already existied');
      done(null,user);
    }else {
      const newuser = new User({
        email:profile.id,
        isverified:true,
        username:'newuser_' + profile.id
      });
      newuser.save().then((nwuser)=>{
        console.log(profile);
        console.log('new user');
        done(null,nwuser);
      });
    }
  });
})
);
